import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import arrowLeftIcon from "../assets/icons/arrow-left.png";
import { Loader } from "../components/Loader";
import { SuccessModal } from "../components/SuccessModal";
import styles from "./EditUserPage.module.scss";
import { normalizePhone, type EditUserFormData } from "./edit-user/model/editUserForm";
import { useEditUserFormModel } from "./edit-user/model/useEditUserFormModel";
import { useEditUserQuery } from "./edit-user/model/useEditUserQuery";
import { useEditUserStoreModel } from "./edit-user/model/useEditUserStoreModel";

export const EditUserPage = () => {
  const params = useParams<{ userId: string }>();
  const userId = Number(params.userId);

  const { isValidId, user, isPending, isError, error } =
    useEditUserQuery(userId);

  const { mergedEditable, avatarUrl, save } = useEditUserStoreModel(user);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useEditUserFormModel(mergedEditable);

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isValidId) {
    return (
      <p className="feedback feedback--error">Некорректный ID пользователя</p>
    );
  }

  if (isPending && !user) {
    return <Loader message="Загрузка пользователя..." />;
  }

  if (isError && !user) {
    return (
      <p className="feedback feedback--error">
        {error?.message ?? "Ошибка загрузки пользователя"}
      </p>
    );
  }

  if (!user) {
    return <p className="feedback feedback--error">Пользователь не найден</p>;
  }

  const onSubmit = (values: EditUserFormData) => {
    save(values);
    setIsModalOpen(true);
  };

  return (
    <div className={`container ${styles.editPage}`}>
      <Link className={styles.back} to="/">
        <img className={styles.backIcon} src={arrowLeftIcon} alt="" aria-hidden="true" />
        <span>Назад</span>
      </Link>

      <div className={styles.content}>
        <aside className={styles.settingsCard}>
          <img className={styles.settingsImage} src={avatarUrl} alt={user.username} />
          <ul className={styles.settingsCategories}>
            <li className={`${styles.settingsCategory} ${styles.settingsCategoryActive}`}>
              Данные профиля
            </li>
            <li className={styles.settingsCategory}>Рабочее пространство</li>
            <li className={styles.settingsCategory}>Приватность</li>
            <li className={styles.settingsCategory}>Безопасность</li>
          </ul>
        </aside>

        <section className={styles.profileCard}>
          <header className={styles.profileHeader}>
            <h1>Данные профиля</h1>
          </header>

          <form className={styles.profileForm} onSubmit={handleSubmit(onSubmit)}>
            <label className={styles.field}>
              <span>Имя</span>
              <input type="text" {...register("name")} />
              {errors.name && <small>{errors.name.message}</small>}
            </label>

            <label className={styles.field}>
              <span>Никнейм</span>
              <input type="text" {...register("username")} />
              {errors.username && <small>{errors.username.message}</small>}
            </label>

            <label className={styles.field}>
              <span>Почта</span>
              <input type="email" {...register("email")} />
              {errors.email && <small>{errors.email.message}</small>}
            </label>

            <label className={styles.field}>
              <span>Город</span>
              <input type="text" {...register("city")} />
              {errors.city && <small>{errors.city.message}</small>}
            </label>

            <label className={styles.field}>
              <span>Телефон</span>
              <input
                type="text"
                inputMode="tel"
                {...register("phone", {
                  onChange: (event) => {
                    event.target.value = normalizePhone(
                      String(event.target.value),
                    );
                  },
                })}
              />
              {errors.phone && <small>{errors.phone.message}</small>}
            </label>

            <label className={styles.field}>
              <span>Название компании</span>
              <input type="text" {...register("companyName")} />
              {errors.companyName && (
                <small>{errors.companyName.message}</small>
              )}
            </label>

            <label className={styles.field}>
              <span>Аватарка (URL)</span>
              <input type="url" {...register("avatarUrl")} />
              {errors.avatarUrl && <small>{errors.avatarUrl.message}</small>}
            </label>

            <button
              className={`primary-pill ${styles.submit}`}
              type="submit"
              disabled={isSubmitting}
            >
              Сохранить
            </button>
          </form>
        </section>
      </div>

      <SuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
