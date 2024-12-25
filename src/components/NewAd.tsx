import React from 'react';
import { useAppSelector } from '../store/hooks';
import api from '../api/cars';
import adApi from '../api/ads';
import FormData from 'form-data';
import AddIcon from '../assets/addIcon.svg?react';
import HideIcon from '../assets/hideIcon.svg?react';
import Form from './Form';
import { selectToken } from '../store/user/selectors';

const NewAd: React.FC = () => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [marks, setMarks] = React.useState<{ id: string; name: string }[]>([]);
  const [models, setModels] = React.useState<{ id: string; name: string }[]>([]);
  const [selectedMarkId, setSelectedMarkId] = React.useState<string>('');
  const [selectedModelId, setSelectedModelId] = React.useState<string>('');
  const [errors, setErrors] = React.useState<Record<string, string>>({}); // Track validation errors

  const token = useAppSelector(selectToken);

  React.useEffect(() => {
    if (token) {
      api.fetchMarks(token).then((res) => setMarks(res));
    }
  }, [token]);

  React.useEffect(() => {
    if (selectedMarkId && token) {
      api.fetchModels(token).then((res) => {
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

  const handleNewAd = async (event: React.FormEvent<HTMLFormElement>) => {
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

    if (token) {
      try {
        await adApi.createAd(token, newAdObj);
        alert('Оголошення успішно створено!');
        setVisible(false);
        form.reset(); // Reset form fields
      } catch (error) {
        alert('Сталася помилка при створенні оголошення!');
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col items-start relative w-1/2 gap-5">
      <button
        className="flex px-2 py-2 rounded-full hover:bg-gray-300 hover:text-gray-900 transition-all duration-200 ease-in-out text-gray-300 w-16 items-center justify-center shadow-custom"
        onClick={() => setVisible(!visible)}>
        {visible ? <HideIcon /> : <AddIcon />}
      </button>
      {visible && (
        <Form
          onSubmit={handleNewAd}
          className="flex flex-col gap-3 p-4 bg-gray-300 text-gray-900 rounded-lg shadow-md items-start w-fit">
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
            <span>Пробіг(км):</span>
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
            <span>Ціна($):</span>
            <Form.Input
              name="cost"
              type="number"
              placeholder="cost"
              className="flex p-3 bg-gray-100 rounded-lg shadow-md w-[260px]"
            />
          </div>

          <div className="flex flex-row justify-between items-center w-full">
            <span>Локація:</span>
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
          <Form.Submit className="flex w-full">Додати оголошення</Form.Submit>
        </Form>
      )}
    </div>
  );
};

export default NewAd;
