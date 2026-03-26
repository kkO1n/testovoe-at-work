import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import { SuccessModal } from "../components/SuccessModal";
import type { EditUserFormData } from "./edit-user/model/editUserForm";
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
    <div className="edit-page container">
      <Link className="edit-page__back" to="/">
        <span aria-hidden="true">←</span>
        <span>Назад</span>
      </Link>

      <div className="edit-page__content">
        <aside className="settings-card">
          <img
            className="settings-card__image"
            src={avatarUrl}
            alt={user.username}
          />
          <ul className="settings-card__categories">
            <li className="settings-card__category settings-card__category--active">
              Данные профиля
            </li>
            <li className="settings-card__category">Рабочее пространство</li>
            <li className="settings-card__category">Приватность</li>
            <li className="settings-card__category">Безопасность</li>
          </ul>
        </aside>

        <section className="profile-card">
          <header className="profile-card__header">
            <h1>Данные профиля</h1>
          </header>

          <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
            <label className="profile-form__field">
              <span>Имя</span>
              <input type="text" {...register("name")} />
              {errors.name && <small>{errors.name.message}</small>}
            </label>

            <label className="profile-form__field">
              <span>Никнейм</span>
              <input type="text" {...register("username")} />
              {errors.username && <small>{errors.username.message}</small>}
            </label>

            <label className="profile-form__field">
              <span>Почта</span>
              <input type="email" {...register("email")} />
              {errors.email && <small>{errors.email.message}</small>}
            </label>

            <label className="profile-form__field">
              <span>Город</span>
              <input type="text" {...register("city")} />
              {errors.city && <small>{errors.city.message}</small>}
            </label>

            <label className="profile-form__field">
              <span>Телефон</span>
              <input
                type="text"
                inputMode="numeric"
                {...register("phone", {
                  onChange: (event) => {
                    event.target.value = String(event.target.value).replace(
                      /\D/g,
                      "",
                    );
                  },
                })}
              />
              {errors.phone && <small>{errors.phone.message}</small>}
            </label>

            <label className="profile-form__field">
              <span>Название компании</span>
              <input type="text" {...register("companyName")} />
              {errors.companyName && (
                <small>{errors.companyName.message}</small>
              )}
            </label>

            <label className="profile-form__field">
              <span>Аватарка (URL)</span>
              <input type="url" {...register("avatarUrl")} />
              {errors.avatarUrl && <small>{errors.avatarUrl.message}</small>}
            </label>

            <button
              className="profile-form__submit"
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
