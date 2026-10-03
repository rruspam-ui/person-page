import styles from './Tag.module.css';

/** Свойства метки */
type TagProps = {
    /** Текст метки */
    label: string;
};

/** Метка технологии */
export function Tag({ label }: TagProps) {
    return <li className={styles.tag}>{label}</li>;
}

/** Свойства списка меток */
type TagListProps = {
    /** Тексты меток */
    items: string[];
    /** Подпись списка для экранных дикторов */
    ariaLabel?: string;
};

/** Список меток технологий */
export function TagList({ items, ariaLabel }: TagListProps) {
    return (
        <ul className={styles.list} aria-label={ariaLabel}>
            {items.map((item) => (
                <Tag key={item} label={item} />
            ))}
        </ul>
    );
}
