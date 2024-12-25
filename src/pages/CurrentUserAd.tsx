import React from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api/ads';
import apiCars from '../api/cars';

import { useAppSelector } from '../store/hooks';
import { selectToken } from '../store/user/selectors';
import Form from '../components/Form';

interface CarData {
  id: string;
  name: string;
  race: number;
  releaseYear: number;
  mark: string;
  model: string;
  ownerName: string;
  ownerPhone: string;
  cost: number;
  image: string;
  address: string;
  description: string;
  publicDate: string;
  ownerId: string;
}

const CurrentUserAd = () => {
  const { id } = useParams<{ id: string }>();
  const token = useAppSelector(selectToken);
  const [car, setCar] = React.useState<CarData>();
  const [visible, setVisible] = React.useState<boolean>(false);
  const [marks, setMarks] = React.useState<{ id: string; name: string }[]>([]);
  const [models, setModels] = React.useState<{ id: string; name: string }[]>([]);
  const [selectedMarkId, setSelectedMarkId] = React.useState<string>('');
  const [selectedModelId, setSelectedModelId] = React.useState<string>('');
  const [errors, setErrors] = React.useState<Record<string, string>>({}); // Track validation errors

  React.useEffect(() => {
    if (token && id) {
      api.fetchSingleAd(token, id).then((data) => {
        setCar(data);
      });
    }
  }, [token, id]);

  React.useEffect(() => {
    if (token) {
      apiCars.fetchMarks(token).then((res) => setMarks(res));
    }
  }, [token]);

  React.useEffect(() => {
    if (selectedMarkId && token) {
      apiCars.fetchModels(token).then((res) => {
        const filteredModels = res.filter(
          (model: { markId: string }) => model.markId === selectedMarkId,
        );
        setModels(filteredModels);
      });
    } else {
      setModels([]);
    }
    setSelectedModelId('');
  }, [selectedMarkId, token]);

  const validateForm = (form: HTMLFormElement): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.name.value.trim()) newErrors.name = 'Назва є обов’язковою';
    if (!form.race.value.trim()) newErrors.race = 'Пробіг є обов’язковим';
    if (!form.releaseYear.value.trim()) newErrors.releaseYear = 'Рік випуску є обов’язковим';
    if (!selectedMarkId) newErrors.mark = 'Марка є обов’язковою';
    if (!selectedModelId) newErrors.model = 'Модель є обов’язковою';
    if (!form.cost.value.trim()) newErrors.cost = 'Ціна є обов’язковою';
    if (!form.address.value.trim()) newErrors.address = 'Адреса є обов’язковою';
    if (!form.image.files.length) newErrors.image = 'Зображення є обов’язковим';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateAd = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    if (!validateForm(form)) return;

    const formData = new FormData(form);

    const newAdObj = {
      name: form.name.value,
      race: form.race.value,
      releaseYear: form.releaseYear.value,
      mark: selectedMarkId,
      model: selectedModelId,
      cost: form.cost.value,
      address: form.address.value,
      description: form.description.value,
      image: formData.get('image'),
    };

    if (token && id) {
      try {
        await api.updateAd(token, id, newAdObj);
        alert('Оголошення успішно змінено!');
        setVisible(false);
        form.reset(); // Reset form fields
        const updatedCar = await api.fetchSingleAd(token, id);
        setCar(updatedCar);
      } catch (error) {
        alert('Сталася помилка при створенні оголошення!');
        console.error(error);
      }
    }
  };

  const handleDeleteAd = async () => {
    if (!token || !id) return;

    const isConfirmed = window.confirm('Ви впевнені, що хочете видалити це оголошення?');
    if (!isConfirmed) return;

    try {
      await api.deleteAd(token, id);
      alert('Оголошення успішно видалено!');
      window.history.back();
    } catch (error) {
      console.error(error);
      alert('Сталася помилка при видаленні оголошення!');
    }
  };

  return (
    <>
      {car && (
        <div className="mx-80 mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img src={car.image} alt={car.name} className="w-full h-96 object-cover rounded-lg" />
            </div>
            <div className="md:w-1/2 ml-4 mt-4 md:mt-0">
              <h1 className="text-3xl font-bold mb-2">{car.name}</h1>
              <p className="text-lg mb-2">
                {car.mark} {car.model}
              </p>
              <p className="text-lg mb-2">Рік випуску: {car.releaseYear}</p>
              <p className="text-lg mb-2">Пробіг: {car.race} км</p>
              <p className="text-lg mb-2">Ціна: {car.cost} $</p>
              <p className="text-lg mb-2">Дата створення: {car.publicDate}</p>
              <p className="text-lg mb-2">Адреса: {car.address}</p>
              <div className="flex items-center mt-4">
                <button
                  onClick={() => {
                    setVisible(!visible);
                  }}
                  className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded">
                  Редагувати
                </button>
              </div>
              {visible && (
                <Form
                  onSubmit={handleUpdateAd}
                  className="flex flex-col gap-3 my-3 p-4 bg-gray-300 text-gray-900 rounded-lg shadow-md items-start w-fit">
                  <div className="flex flex-row justify-between items-center w-full">
                    <span>Назва:</span>
                    <Form.Input
                      name="name"
                      placeholder="назва оголошення"
                      type="text"
                      className="flex p-3 bg-gray-100 rounded-lg shadow-md w-[260px]"
                    />
                  </div>
                  <div className="flex flex-row justify-between items-center w-full">
                    <span>Пробіг:</span>
                    <Form.Input
                      name="race"
                      placeholder="пробіг"
                      type="number"
                      className="flex p-3 bg-gray-100 rounded-lg shadow-md w-[260px]"
                    />
                  </div>
                  <div className="flex flex-row justify-between items-center w-full">
                    <span>Рік випуску:</span>
                    <Form.Input
                      name="releaseYear"
                      placeholder="рік випуску"
                      type="number"
                      className="flex p-3 bg-gray-100 rounded-lg shadow-md w-[260px]"
                    />
                  </div>
                  <div className="flex flex-row justify-between items-center w-full">
                    <label htmlFor="mark">Марка:</label>
                    <select
                      id="mark"
                      name="mark"
                      value={selectedMarkId}
                      onChange={(e) => setSelectedMarkId(e.target.value)}
                      className="flex p-3 bg-gray-100 rounded-lg shadow-md w-[260px]">
                      <option value="">Будь-яка</option>
                      {marks.map((mark) => (
                        <option key={mark.id} value={mark.id}>
                          {mark.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-row justify-between items-center w-full">
                    <label htmlFor="model">Модель:</label>
                    <select
                      id="model"
                      name="model"
                      disabled={!selectedMarkId}
                      value={selectedModelId}
                      onChange={(e) => setSelectedModelId(e.target.value)}
                      className="flex p-3 bg-gray-100 rounded-lg shadow-md w-[260px]">
                      <option value="">Будь-яка</option>
                      {models.map((model) => (
                        <option key={model.id} value={model.id}>
                          {model.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-row justify-between items-center w-full">
                    <span>Cost:</span>
                    <Form.Input
                      name="cost"
                      type="number"
                      placeholder="cost"
                      className="flex p-3 bg-gray-100 rounded-lg shadow-md w-[260px]"
                    />
                  </div>

                  <div className="flex flex-row justify-between items-center w-full">
                    <span>Де знаходиться:</span>
                    <Form.Input
                      name="address"
                      type="text"
                      placeholder=""
                      className="flex p-3 bg-gray-100 rounded-lg shadow-md w-[260px]"
                    />
                  </div>
                  <div className="flex flex-row justify-between items-center w-full">
                    <span>Зображення:</span>
                    <input
                      type="file"
                      name="image"
                      accept=".jpg, .jpeg, .png"
                      className="flex p-3 bg-gray-100 rounded-lg shadow-md w-[260px]"
                    />
                  </div>
                  <div className="flex flex-row justify-between items-center w-full">
                    <span>Опис:</span>
                    <Form.Input
                      name="description"
                      placeholder="event description"
                      type="text"
                      className="flex p-3 bg-gray-100 rounded-lg shadow-md w-[260px]"
                    />
                  </div>
                  <Form.Submit className="flex w-full">Добавить объявление</Form.Submit>
                </Form>
              )}
              <div className="flex items-center mt-4">
                <button
                  onClick={() => {
                    console.log(car.ownerId);
                  }}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  <Link to={`/myAds`}>Ще оголошення</Link>
                </button>
              </div>
              <div className="flex items-center mt-4">
                <button
                  onClick={handleDeleteAd}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Видалити
                </button>
              </div>
              <div className="mt-6 p-4 border-t-2 border-gray-200">
                <h2 className="text-xl font-bold">Опис</h2>
                <p className="text-gray-700 mt-2">{car.description}</p>
              </div>
              <div className="mt-6 p-4 border-t-2 border-gray-200">
                <h2 className="text-xl font-bold">Контакти власника</h2>
                <p className="text-gray-700 mt-2">Ім'я: {car.ownerName}</p>
                <p className="text-gray-700 mt-1">Телефон: {car.ownerPhone}</p>
              </div>
              <button
                onClick={() => window.history.back()}
                className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Назад
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CurrentUserAd;
