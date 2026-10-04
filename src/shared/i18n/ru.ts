/** Строки интерфейса на русском. Структура этого объекта задаёт тип словаря для остальных языков */
export const ru = {
    nav: {
        about: 'Обо мне',
        strengths: 'Сильные стороны',
        experience: 'Опыт работы',
        skills: 'Навыки',
        education: 'Образование',
        contacts: 'Контакты',
        openMenu: 'Открыть меню',
        closeMenu: 'Закрыть меню',
        language: 'Язык сайта',
        label: 'Разделы сайта',
    },
    cta: {
        contactMe: 'Связаться со мной',
    },
    stats: {
        years: 'коммерческой разработки',
        teams: 'команда, где я был тимлидом',
        technologies: 'технологий в рабочем стеке',
    },
    strengths: {
        subtitle: 'Что я приношу команде и продукту',
    },
    experience: {
        present: 'н.в.',
        teamLead: 'Team Lead',
        expand: 'Развернуть',
        collapse: 'Свернуть',
    },
    skills: {
        subtitle: 'Технологии, с которыми работал в продакшене',
    },
    education: {
        languages: 'Языки',
        graduated: 'Окончил в',
    },
    contact: {
        title: 'Давайте обсудим',
        text: 'Расскажите о вакансии или задаче — оставьте удобный способ связи, и я отвечу.',
        modalTitle: 'Написать мне',
        modalText: 'Оставьте контакт — я свяжусь с вами.',
        close: 'Закрыть',
        name: 'Ваше имя',
        namePlaceholder: 'Например, Анна',
        contact: 'Как с вами связаться',
        contactPlaceholder: 'Telegram, e-mail или телефон',
        message: 'Сообщение',
        messagePlaceholder: 'Коротко о вакансии или проекте',
        submit: 'Отправить',
        sending: 'Отправляю…',
        success: 'Спасибо! Сообщение отправлено, я скоро свяжусь с вами.',
        error: 'Не удалось отправить сообщение. Проверьте интернет и попробуйте ещё раз.',
        sendAnother: 'Написать ещё',
        charsLeft: 'Осталось символов: {n}',
        errors: {
            required: 'Заполните это поле',
            tooShort: 'Слишком коротко, минимум символов: {n}',
            tooLong: 'Слишком длинно, максимум символов: {n}',
        },
    },
    footer: {
        rights: 'Руслан Исламов',
    },
};

/** Тип словаря интерфейса */
export type Dictionary = typeof ru;
