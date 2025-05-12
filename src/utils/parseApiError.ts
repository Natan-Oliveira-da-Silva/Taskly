export function parseApiError(error: unknown, fallback = 'Erro inesperado. Tente novamente.'): string {
    if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as any).response?.data === 'object'
    ) {
        const data = (error as any).response.data;
        return data?.error || data?.message || fallback;
    }

    return fallback;
}
