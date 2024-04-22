import {useAppSelector} from "./redux-hooks.ts";

export function useAuth() {
    const {id, email, token} = useAppSelector((state) => state.user)

    return {isAuth: !!id, id, email, token}
}