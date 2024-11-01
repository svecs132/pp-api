type Result<T, E> = {
    ok: true,
    value: T,
} | {
    ok: false,
    error: E,
}

const ok = <T>(value: T): Result<T, any> => {
    return {
        ok: true,
        value: value,
    }
}

const err = <E>(error: E): Result<any, E> => {
    return {
        ok: false,
        error: error,
    }
}

const endpoint = {
    get(target, prop) {
        if (prop === "get") return async () => {
            const res = await fetch(target._url, {
                method: "GET",
            });
            if (!res.ok) {
                return err(res.statusText);
            }
            return ok(await res.json());
        }
        if (prop === "post") return async (body: any) => {
            const res = await fetch(target._url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            if (!res.ok) {
                return err(res.statusText);
            }
            return ok(await res.json());
        }
        if (prop === "put") return async (body: any) => {
            const res = await fetch(target._url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            if (!res.ok) {
                return err(res.statusText);
            }
            return ok(await res.json());
        }
        if (prop === "delete") return async () => {
            const res = await fetch(target._url, {
                method: "DELETE",
            });
            if (!res.ok) {
                return err(res.statusText);
            }
            return ok(await res.json());
        }
        const _url = `${target._url}/${prop}`
        return new Proxy({ _url }, endpoint)
    }
}

/**
 * Prepares the connection to the ProPresenter Instance
 * @param host the IP address or hostname of the ProPresenter machine
 * @param port the port the ProPresenter instance is using (check in Preferences > Network)
 * @returns the object indexable by the API paths
 */
export const init = (host: string, port: number) => {
    return new Proxy({ _url: `http://${host}:${port}` }, endpoint)
}
