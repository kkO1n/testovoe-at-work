import { useEffect, useRef, useState } from "react";
import type { UserCardModel } from "../types/user";
import styles from "./UserCard.module.scss";

interface UserCardProps {
  user: UserCardModel;
  onEdit: (id: number) => void;
  onArchive: (id: number) => void;
  onActivate: (id: number) => void;
  onHide: (id: number) => void;
}

export const UserCard = ({
  user,
  onEdit,
  onArchive,
  onActivate,
  onHide,
}: UserCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onWindowClick = (event: MouseEvent) => {
      if (!menuRef.current) {
        return;
      }

      if (!menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("click", onWindowClick);
    return () => window.removeEventListener("click", onWindowClick);
  }, []);

  const isArchived = user.archived;
  const cardClassName = [styles.card, isArchived ? styles.archived : ""]
    .join(" ")
    .trim();

  return (
    <article className={cardClassName}>
      <img className={styles.avatar} src={user.avatarUrl} alt={user.username} />

      <div className={styles.content}>
        <div>
          <div className={styles.head}>
            <h3 className={styles.username}>{user.username}</h3>

            <div className={styles.menu} ref={menuRef}>
              <button
                type="button"
                className={styles.menuTrigger}
                aria-expanded={isMenuOpen}
                aria-label="Открыть меню действий"
                onClick={(event) => {
                  event.stopPropagation();
                  setIsMenuOpen((prev) => !prev);
                }}
              >
                <span />
                <span />
                <span />
              </button>

              {isMenuOpen && (
                <div className={styles.menuList}>
                  {isArchived ? (
                    <button
                      type="button"
                      className={styles.menuActionSingle}
                      onClick={() => {
                        onActivate(user.id);
                        setIsMenuOpen(false);
                      }}
                    >
                      Активировать
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          onEdit(user.id);
                          setIsMenuOpen(false);
                        }}
                      >
                        Редактировать
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onArchive(user.id);
                          setIsMenuOpen(false);
                        }}
                      >
                        Архивировать
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onHide(user.id);
                          setIsMenuOpen(false);
                        }}
                      >
                        Скрыть
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <p className={styles.company}>{user.companyName}</p>
        </div>

        <p className={styles.city}>{user.city}</p>
      </div>
    </article>
  );
};
