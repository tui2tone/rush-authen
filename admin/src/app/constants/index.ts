const getColor = (color: string) => {
    return {
        backgroundColor: `rgba(${color},1)`,
        borderColor: `rgba(${color}, 1)`,
        pointBackgroundColor: `rgba(${color},1)`,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: `rgba(${color},0.8)`
    }
}

const getColors = (colors: string[], transparent: number = 1) => {
    return {
        backgroundColor: colors.map(color => `rgba(${color},${transparent})`),
        borderColor: colors.map(color => `rgba(${color}, ${transparent})`),
        pointBackgroundColor: colors.map(color => `rgba(${color},${transparent})`),
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: colors.map(color => `rgba(${color},${transparent})`),
    }
}

const colorSet3 = () => {
    return ['153, 102, 255', '54, 162, 235', '75, 192, 192', '255, 205, 86', '255, 159, 64', '255, 99, 132', '126, 161, 107', '157, 217, 210', '52, 42, 33', '105, 143, 63', '221, 115, 115', '81, 163, 163', '68, 69, 69', '98, 88, 52', '70, 140, 152']
}

export const Config = {
    APP_URL: {
        PAGE: {
            CREATE: "/create",
            EDIT: "/{0}/edit",
            EDIT_NOINDEX: "/edit"
        },
        MAIN: '/',
        AUTH: '/auth',
        PROJECT: '/projects'
    },
    API_URL: {
        PROJECT: '/projects'
    },
    POSTFIX: {
        AUTOCOMPLETE: '/autocomplete'
    },
    COLOR_SET: {
        SET1: [
            'rgb(153, 102, 255)',
            'rgb(54, 162, 235)',
            'rgb(75, 192, 192)',
            'rgb(255, 205, 86)',
            'rgb(255, 159, 64)',
            'rgb(255, 99, 132)'
        ],
        SET2: [
            'rgb(153, 102, 255, 0.5)',
            'rgb(54, 162, 235, 0.5)',
            'rgb(75, 192, 192, 0.5)',
            'rgb(255, 205, 86, 0.5)',
            'rgb(255, 159, 64, 0.5)',
            'rgb(255, 99, 132, 0.5)'
        ],
        SET3: [
            getColor('255, 205, 86'),
            getColor('153, 102, 255'),
            getColor('75, 192, 192')
        ],

        COLOR_SET1: [
            getColor('153, 102, 255'),
            getColor('54, 162, 235'),
            getColor('75, 192, 192'),
            getColor('255, 205, 86'),
            getColor('255, 159, 64'),
            getColor('255, 99, 132')
        ],
        COLOR_SET2: [
            getColors(['153, 102, 255', '54, 162, 235', '75, 192, 192', '255, 205, 86', '255, 159, 64', '255, 99, 132'], 1),
            getColors(['153, 102, 255', '54, 162, 235', '75, 192, 192', '255, 205, 86', '255, 159, 64', '255, 99, 132'], 0.4)
        ],
        COLOR_SET3: [
            getColors(colorSet3(), 1),
            getColors(colorSet3(), 0.4)
        ],
        LINE_SET1: [
            {
                backgroundColor: 'rgba(255, 205, 86, 0.2)',
                borderColor: 'rgba(255, 205, 86, 1)',
                pointBackgroundColor: 'rgba(255, 205, 86,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255, 205, 86,0.8)'
            }
        ],
        LINE_SET1_TRANSPARENT: [
            'rgb(255, 205, 86, 0.4)'
        ]
    }
}

export const getAppUrl = (path, ...params) => {
    params.map((item, index) => {
        path = path.replace(`{${index}}`, item)
    })
    return path
}

export const getApiUrl = (path, ...params) => {
    params.map((item, index) => {
        path = path.replace(`{${index}}`, item)
    })
    return path
}

export default Config;