import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'

/**
 * A list of records stored in one JSON file (`<dir>/<name>.json`): our small "database".
 *
 * - Reads return what is on disk (a missing file is an empty list).
 * - `update` runs one change at a time. Requests that arrive together wait in line,
 *   so two writers can never overwrite each other's changes.
 * - Each write goes to a temp file first, then replaces the real file in one step,
 *   so a crash in the middle can not leave a half-written (broken) file.
 *
 * This is fine for one server process and a few thousand records. If the site ever
 * needs more, swap this class for a real database; the rest of the code only uses `read` and `update`.
 */
export class JsonCollection<T> {
  readonly #file: string
  #queue: Promise<unknown> = Promise.resolve()

  constructor(dir: string, name: string) {
    this.#file = path.join(dir, `${name}.json`)
  }

  async read(): Promise<T[]> {
    try {
      const raw = await readFile(this.#file, 'utf8')
      const data: unknown = JSON.parse(raw)
      if (!Array.isArray(data)) throw new Error(`${this.#file} must contain a JSON array`)
      return data as T[]
    } catch (error) {
      if (isNotFound(error)) return []
      throw error
    }
  }

  /** Reads the list, lets `change` return the new list (plus any result), and saves it. */
  update<R = void>(change: (items: T[]) => { items: T[]; result: R }): Promise<R> {
    const run = this.#queue.then(async () => {
      const { items, result } = change(await this.read())
      await this.#write(items)
      return result
    })
    // A failed update must not block the ones behind it.
    this.#queue = run.catch(() => undefined)
    return run
  }

  async #write(items: T[]) {
    await mkdir(path.dirname(this.#file), { recursive: true })
    const temp = `${this.#file}.tmp`
    await writeFile(temp, JSON.stringify(items, null, 2), 'utf8')
    await rename(temp, this.#file)
  }
}

function isNotFound(error: unknown) {
  return error instanceof Error && 'code' in error && error.code === 'ENOENT'
}
