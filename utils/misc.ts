export const ease = [0.410, 0.030, 0.000, 0.995];

export const errToast = (toast: any, err: any) => {
    console.error(err);

    if (typeof err === 'string') toast({
        title: 'Ошибка',
        description: err,
        status: 'error',
        duration: 5000,
        isClosable: true
    });
    else if (err.response) toast({
        title: err.response.statusText ?? 'Ошибка',
        description: err.response.data.detail[0]?.msg ?? err.response.data.detail,
        status: 'error',
        duration: 5000,
        isClosable: true
    });
}
