import React from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import api from '../api/cars';
import { selectToken } from '../store/user/selectors';
import { setFilter } from '../store/filter/slice';
import { selectPage } from '../store/filter/selectors';
import FilterIcon from '../assets/filterIcon.svg?react';

const CarSearchFilter: React.FC = () => {
  const [marks, setMarks] = React.useState([]); // Данные марок
  const [models, setModels] = React.useState([]); // Данные моделей
  const [selectedMarkId, setSelectedMarkId] = React.useState(''); // ID выбранной марки
  const [selectedModelId, setSelectedModelId] = React.useState(''); // ID выбранной модели
  const [visible, setVisible] = React.useState<boolean>(false);

  const token = useAppSelector(selectToken);
  const page = useAppSelector(selectPage);
  const dispatch = useAppDispatch();
  // Фетч марок при монтировании компонента
  React.useEffect(() => {
    if (token) {
      api.fetchMarks(token).then((res) => {
        setMarks(res);
      });
    }
  }, [token]);

  // Фетч моделей при изменении выбранной марки
  React.useEffect(() => {
    if (selectedMarkId && token) {
      api.fetchModels(token).then((res) => {
        setModels(res.filter((model: { markId: string }) => model.markId === selectedMarkId));
      });
    } else {
      setModels([]); // Очистка моделей, если марка не выбрана
    }
    setSelectedModelId(''); // Сброс модели при изменении марки
  }, [selectedMarkId, token]);

  return (
    <div className="flex flex-col items-end relative w-1/2 gap-5">
      <button
        onClick={() => setVisible(!visible)}
        className="flex px-2 py-2 rounded-full hover:bg-gray-300 hover:text-gray-900 transition-all duration-200 ease-in-out text-gray-300 w-16 items-center justify-center shadow-custom">
        <FilterIcon />
      </button>

      {visible && (
        <div className=" flex flex-col gap-3 p-4 bg-gray-300 text-gray-900 rounded-lg shadow-md items-start w-fit ">
          {/* Селект для марок */}
          <div className="flex flex-row justify-between items-center w-full">
            <label htmlFor="mark">Марка:</label>
            <select
              id="mark"
              name="mark"
              value={selectedMarkId}
              onChange={(e) => setSelectedMarkId(e.target.value)}
              className="flex p-3 bg-gray-100 rounded-lg shadow-md w-[260px]">
              <option value="">Будь-яка</option>
              {marks.map((mark: { id: string; name: string }) => (
                <option key={mark.id} value={mark.id}>
                  {mark.name}
                </option>
              ))}
            </select>
          </div>

          {/* Селект для моделей */}
          <div className="flex flex-row justify-between items-center w-full">
            <label htmlFor="model">Модель:</label>
            <select
              id="model"
              name="model"
              disabled={!selectedMarkId} // Деактивируем, если марка не выбрана
              value={selectedModelId}
              onChange={(e) => setSelectedModelId(e.target.value)}
              className="flex p-3 bg-gray-100 rounded-lg shadow-md w-[260px]">
              <option value="">Будь-яка</option>
              {models.map((model: { id: string; name: string }) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>

          <button
            className="bg-gray-900 hover:bg-gray-800 transition-all	duration-200	ease-in-out text-gray-300 text-lg w-full justify-center px-5 py-1 rounded-xl shadow-custom"
            onClick={() => {
              dispatch(
                setFilter({
                  mark: selectedMarkId === '' ? null : selectedMarkId,
                  model: selectedModelId === '' ? null : selectedModelId,
                  page,
                }),
              );
            }}>
            Знайти
          </button>
        </div>
      )}
    </div>
  );
};

export default CarSearchFilter;
