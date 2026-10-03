/** Поддерживаемые языки интерфейса */
export enum Locale {
    /** Русский */
    Ru = 'ru',
    /** Английский */
    En = 'en',
}

/** Идентификаторы секций страницы (используются как id якорей) */
export enum SectionId {
    /** Первый экран: кто я */
    About = 'about',
    /** Сильные стороны */
    Strengths = 'strengths',
    /** Опыт работы */
    Experience = 'experience',
    /** Навыки */
    Skills = 'skills',
    /** Образование и языки */
    Education = 'education',
    /** Форма связи */
    Contacts = 'contacts',
}

/** Состояние отправки формы связи */
export enum SubmitStatus {
    /** Форма ещё не отправлялась */
    Idle = 'idle',
    /** Идёт отправка */
    Sending = 'sending',
    /** Сообщение отправлено */
    Success = 'success',
    /** Ошибка отправки */
    Error = 'error',
}

/** Поля формы связи; значения совпадают с ключами, которые ждёт Google Apps Script */
export enum FieldName {
    /** Имя отправителя */
    Name = 'name',
    /** Обратный контакт */
    Contact = 'contact',
    /** Текст сообщения */
    Message = 'message',
}

/** Коды ошибок валидации полей формы */
export enum ValidationError {
    /** Поле не заполнено */
    Required = 'required',
    /** Слишком короткое значение */
    TooShort = 'tooShort',
    /** Слишком длинное значение */
    TooLong = 'tooLong',
}

/** Варианты оформления кнопки */
export enum ButtonVariant {
    /** Основная кнопка с акцентным цветом */
    Primary = 'primary',
    /** Кнопка-контур на светлом фоне */
    Outline = 'outline',
}

/** Цветовая схема формы связи */
export enum FormTone {
    /** Светлый фон (модальное окно) */
    Light = 'light',
    /** Тёмно-зелёный фон (секция контактов) */
    Dark = 'dark',
}
