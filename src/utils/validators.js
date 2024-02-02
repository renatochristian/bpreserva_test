export function validateEmptyAndLength(value) {
    if (!value) {
        return 'faltou esse campo aqui'
    }
    if (value.length < 3) {
        return 'ta pequeno demais, aumenta ai'
    }
    return true
}

export function validateEmailLogin(value) {
    if (!value) {
        return 'faltou esse campo aqui'
    }

    // eslint-disable-next-line no-useless-escape
    const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)

    if (!validEmail) {
        return 'isso que voce digitou nem email é, digite direito'
    }

    return true
}

export function validatePhoneNumber(value) {
    if (!value) {
        return 'faltou esse campo aqui'
    }

	const validPhone = /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/.test(value)

	if (!validPhone) {
        return 'esse telefone está incorreto'
    }
    return true
}

export function validateProfile(value) {
    if (!value) {
        return 'faltou esse campo aqui'
    }
	
    return true
}
