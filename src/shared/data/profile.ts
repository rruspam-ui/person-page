import type { Profile } from './profile.types';

/** Данные портфолио, взятые из резюме. Только то, что можно показывать публично */
export const PROFILE: Profile = {
    fullName: { ru: 'Руслан Исламов', en: 'Ruslan Islamov' },
    role: 'Team Lead / Senior Fullstack Developer',
    headline: {
        ru: 'Строю надёжные сервисы и команды, которые их развивают',
        en: 'I build reliable services and the teams that grow them',
    },
    lead: {
        ru:
            '{total} в разработке: начинал с C/C++ и ПО для терминалов, последние {recent} — Node.js / NestJS ' +
            'и React / Angular. Веду продукт от архитектуры до продакшена, распределяю задачи и помогаю ' +
            'команде расти.',
        en:
            '{total} in software development: I started with C/C++ and terminal software, and for the last ' +
            '{recent} I have worked with Node.js / NestJS and React / Angular. I take products from architecture ' +
            'to production, plan the work and help the team grow.',
    },
    currentStackSince: { year: 2018, month: 3 },
    workConditions: [{ ru: 'Санкт-Петербург', en: 'Saint Petersburg' }],
    strengths: [
        {
            title: { ru: 'Лидерство команды', en: 'Team leadership' },
            description: {
                ru:
                    'Тимлид в ВСК: распределение задач, контроль сроков, ввод новых разработчиков ' +
                    'в стек, центр компетенций команды.',
                en:
                    'Team lead at VSK: task planning, deadline control, onboarding new developers, ' +
                    "acting as the team's center of expertise.",
            },
        },
        {
            title: { ru: 'Fullstack от начала до конца', en: 'End-to-end fullstack' },
            description: {
                ru: 'NestJS и Node.js на бэкенде, React и Angular на фронтенде, BFF и микрофронтенды.',
                en: 'NestJS and Node.js on the backend, React and Angular on the frontend, BFF and micro-frontends.',
            },
        },
        {
            title: { ru: 'Распределённые системы', en: 'Distributed systems' },
            description: {
                ru: 'Микросервисы на Kafka, RabbitMQ и NATS, интеграции с мессенджерами и почтой для связи с клиентами.',
                en: 'Microservices on Kafka, RabbitMQ and NATS, messenger and email integrations for customer communication.',
            },
        },
        {
            title: { ru: 'Заказная разработка и MVP', en: 'Client projects and MVPs' },
            description: {
                ru:
                    'Проекты под заказ для крупных российских компаний, включая MVP, и импортозамещение ' +
                    'решений ушедших с рынка брендов.',
                en:
                    'Custom projects for major Russian companies, including MVPs, and replacements for products ' +
                    'of brands that left the market.',
            },
        },
        {
            title: { ru: 'Финтех и страхование', en: 'Fintech and insurance' },
            description: {
                ru:
                    'Ипотечное страхование в ВСК, POS-терминалы и терминалы самообслуживания, технический ' +
                    'и финансовый мониторинг.',
                en: 'Mortgage insurance at VSK, POS and self-service terminals, technical and financial monitoring.',
            },
        },
        {
            title: { ru: 'Широкий стек', en: 'Broad stack' },
            description: {
                ru: 'Python / FastAPI, Go, PHP, C/C++ для терминалов и микроконтроллеров — выбираю инструмент под задачу.',
                en: 'Python / FastAPI, Go, PHP, C/C++ for terminals and microcontrollers — I pick the right tool for the job.',
            },
        },
    ],
    jobs: [
        {
            company: { ru: 'Технология Доверия', en: 'Technologies of Trust' },
            city: { ru: 'Москва', en: 'Moscow' },
            industry: { ru: 'Информационные технологии', en: 'Information technology' },
            position: { ru: 'Senior Fullstack Developer', en: 'Senior Fullstack Developer' },
            isTeamLead: false,
            start: { year: 2024, month: 4 },
            end: { year: 2026, month: 4 },
            summary: {
                ru: 'Fullstack-разработка внутренних продуктов компании и проектов для заказчиков.',
                en: "Fullstack development of the company's in-house products and client projects.",
            },
            achievements: [
                {
                    ru:
                        'Участвовал во внутреннем проекте компании по импортозамещению решений брендов, ' +
                        'ушедших с российского рынка',
                    en: 'Contributed to an in-house import substitution project replacing products of brands that left the Russian market',
                },
                {
                    ru: 'Разрабатывал проекты под заказ для крупных российских компаний',
                    en: 'Delivered custom projects for major Russian companies',
                },
                {
                    ru: 'Создавал MVP — первые рабочие версии новых продуктов для заказчиков',
                    en: 'Built MVPs — the first working versions of new products for clients',
                },
                {
                    ru: 'Разработал сервисы омниканальной коммуникации с клиентами: Email, Telegram, WhatsApp и WeChat',
                    en: 'Built omnichannel customer communication services: Email, Telegram, WhatsApp and WeChat',
                },
            ],
            stack: [
                'Node.js',
                'NestJS',
                'React',
                'Redux',
                'PostgreSQL',
                'MongoDB',
                'Kafka',
                'RabbitMQ',
                'NATS',
                'GraphQL',
                'Python',
                'FastAPI',
                'Go',
            ],
        },
        {
            company: { ru: 'ВСК, САО', en: 'VSK Insurance' },
            city: { ru: 'Москва', en: 'Moscow' },
            industry: { ru: 'Страхование', en: 'Insurance' },
            position: { ru: 'Senior Fullstack Developer', en: 'Senior Fullstack Developer' },
            isTeamLead: true,
            start: { year: 2022, month: 1 },
            end: { year: 2024, month: 4 },
            summary: {
                ru: 'Личный кабинет для оформления и оплаты страховых продуктов компании.',
                en: "Customer portal for purchasing and paying for the company's insurance products.",
            },
            achievements: [
                {
                    ru:
                        'Как лидер команды внедрил страхование крупного продукта — «Ипотека», ставшее основой ' +
                        'для других продуктов со сложной логикой',
                    en:
                        'As team lead, launched insurance for a major product — Mortgage, which became the basis ' +
                        'for other products with complex logic',
                },
                {
                    ru: 'Распределение задач между разработчиками',
                    en: 'Distributed tasks across the development team',
                },
                {
                    ru: 'Помощь новым участникам команды в освоении принятых в компании технологий',
                    en: "Helped new team members ramp up on the company's technology stack",
                },
            ],
            stack: [
                'Node.js',
                'NestJS',
                'Angular',
                'TypeScript',
                'PostgreSQL',
                'MongoDB',
                'Kafka',
                'Redis',
                'MinIO',
                'Sequelize',
                'Docker',
                'GitLab',
                'Jest',
                'BFF',
                'MFE',
            ],
        },
        {
            company: { ru: 'Сириус', en: 'Sirius' },
            city: { ru: 'Санкт-Петербург', en: 'Saint Petersburg' },
            industry: { ru: 'Разработка ПО, системная интеграция', en: 'Software development, system integration' },
            position: { ru: 'Senior Fullstack Developer', en: 'Senior Fullstack Developer' },
            isTeamLead: false,
            start: { year: 2018, month: 3 },
            end: { year: 2021, month: 12 },
            summary: {
                ru:
                    'Серверы и сервисы на Node.js для сети POS-терминалов; обмен данными по REST, MQTT и TCP; ' +
                    'ПО для терминалов на C/C++.',
                en:
                    'Node.js servers and services for a POS terminal network; data exchange over REST, MQTT and TCP; ' +
                    'terminal software in C/C++.',
            },
            achievements: [
                {
                    ru: 'Сервер параметризации POS-терминалов (TMS)',
                    en: 'POS terminal management server (TMS)',
                },
                {
                    ru: 'Сервисы технического и финансового мониторинга сети терминалов',
                    en: 'Technical and financial monitoring services for the terminal network',
                },
                {
                    ru: 'Merchant Portal — сервер для доступа клиентов',
                    en: 'Merchant Portal — client access server',
                },
                {
                    ru: 'Автоматизация сборки: Jenkins, Drone CI, Gogs',
                    en: 'Build automation: Jenkins, Drone CI, Gogs',
                },
                {
                    ru:
                        'Обязанности: постановка задач и контроль их выполнения, планирование этапов ' +
                        'разработки, обучение и сопровождение клиентов, документация',
                    en:
                        'Responsibilities: assigning and tracking tasks, release planning, client training ' +
                        'and support, documentation',
                },
            ],
            stack: [
                'Node.js',
                'AngularJS',
                'PostgreSQL',
                'Oracle',
                'MySQL',
                'Knex.js',
                'RabbitMQ',
                'MQTT',
                'Jenkins',
                'Drone CI',
                'C/C++',
            ],
        },
        {
            company: { ru: 'АРКОМ / Ingenico', en: 'ARCOM / Ingenico' },
            industry: { ru: 'Терминалы самообслуживания', en: 'Self-service terminals' },
            position: { ru: 'Ведущий разработчик C/C++', en: 'Lead C/C++ Developer' },
            isTeamLead: false,
            start: { year: 2008, month: 8 },
            end: { year: 2018, month: 3 },
            summary: {
                ru:
                    'Комплекс ПО для терминалов самообслуживания: приложение терминала, серверы управления ' +
                    'и мониторинга.',
                en: 'Software suite for self-service terminals: the terminal application plus management and monitoring servers.',
            },
            achievements: [
                {
                    ru:
                        'Приложение терминала под Windows на C++ (Visual Studio): пользовательский интерфейс, ' +
                        'интеграция с оборудованием терминала по различным протоколам, обмен данными с серверами по HTTP',
                    en:
                        'Windows terminal application in C++ (Visual Studio): user interface, integration with ' +
                        'in-terminal hardware over various protocols, HTTP communication with the servers',
                },
                {
                    ru: 'Серверы управления терминалами и мониторинга их состояния на PHP',
                    en: 'Terminal management and health monitoring servers in PHP',
                },
                {
                    ru: 'Собственные модули терминала: программирование микроконтроллеров на C/C++',
                    en: 'Custom terminal modules: microcontroller programming in C/C++',
                },
            ],
            stack: ['C/C++', 'Visual Studio', 'Windows', 'PHP', 'HTTP', 'Embedded'],
        },
        {
            company: { ru: 'ООО «АТМ-Сервис»', en: 'ATM-Service LLC' },
            industry: { ru: 'Банковское оборудование', en: 'Banking equipment' },
            position: { ru: 'Разработчик C/C++', en: 'C/C++ Developer' },
            isTeamLead: false,
            start: { year: 2005, month: 6 },
            end: { year: 2008, month: 8 },
            summary: {
                ru: 'ПО для диагностики банкоматов и прошивки устройств, встраиваемых в банкоматы.',
                en: 'ATM diagnostic software and firmware for devices embedded in ATMs.',
            },
            achievements: [
                {
                    ru: 'Разработка ПО для диагностики оборудования банкоматов',
                    en: 'Developed diagnostic software for ATM hardware',
                },
                {
                    ru: 'Разработка ПО для отдельных устройств, встраиваемых в банкоматы',
                    en: 'Developed software for standalone devices embedded in ATMs',
                },
            ],
            stack: ['C/C++', 'Windows', 'Microcontrollers', 'Embedded', 'Hardware diagnostics'],
        },
    ],
    skillGroups: [
        {
            title: { ru: 'Backend', en: 'Backend' },
            items: ['Node.js', 'NestJS', 'Express.js', 'GraphQL', 'REST API', 'BFF'],
        },
        {
            title: { ru: 'Frontend', en: 'Frontend' },
            items: ['React', 'Redux', 'Angular', 'TypeScript', 'JavaScript', 'HTML', 'Micro-frontends'],
        },
        {
            title: { ru: 'Базы данных', en: 'Databases' },
            items: ['PostgreSQL', 'MongoDB', 'Redis', 'Oracle', 'MySQL', 'TypeORM', 'Sequelize', 'Knex.js'],
        },
        {
            title: { ru: 'Брокеры сообщений', en: 'Message brokers' },
            items: ['Kafka', 'RabbitMQ', 'NATS', 'MQTT'],
        },
        {
            title: { ru: 'DevOps и инструменты', en: 'DevOps and tooling' },
            items: ['Docker', 'Docker Compose', 'GitLab CI', 'Jenkins', 'Git', 'Linux', 'MinIO', 'Jest'],
        },
        {
            title: { ru: 'Другие языки', en: 'Other languages' },
            items: ['Python', 'FastAPI', 'Go', 'PHP', 'C/C++'],
        },
    ],
    education: [
        {
            institution: {
                ru: 'Санкт-Петербургский государственный университет аэрокосмического приборостроения (ГУАП)',
                en: 'Saint Petersburg State University of Aerospace Instrumentation (SUAI)',
            },
            speciality: {
                ru: 'Вычислительные машины и программирование, инженер-программист',
                en: 'Computers and programming, software engineer',
            },
            year: 2005,
        },
    ],
    languages: [
        { name: { ru: 'Русский', en: 'Russian' }, level: { ru: 'родной', en: 'native' } },
        { name: { ru: 'Английский', en: 'English' }, level: { ru: 'B1 — средний', en: 'B1 — intermediate' } },
    ],
};
