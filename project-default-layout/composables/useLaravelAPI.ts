export const useLaravelAPI = () => {
    const config = useRuntimeConfig();
    return config.public.laravelAPI;
}