import React, { memo, useEffect, useRef } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSortType, sortPropertyEnum, SortType } from '../../redux/slices/filterSlice';

type SortItem = {
  name: string;
  sortProperty: sortPropertyEnum;
}

type SortProps = {
  value: SortType
}

export const massSort: SortItem[] = [
  {
    name: 'популярности (возрастанию)',
    sortProperty: sortPropertyEnum.RATING_DESC
  },
  {
    name: 'популярности (убыванию)',
    sortProperty: sortPropertyEnum.RATING_ASC
  },
  {
    name: 'цене (возрастанию)',
    sortProperty: sortPropertyEnum.PRICE_DESC
  },
  {
    name: 'цене (убыванию)',
    sortProperty: sortPropertyEnum.PRICE_ASC
  },
  {
    name: 'алфавиту (возрастанию)',
    sortProperty: sortPropertyEnum.TITLE_DESC
  },
  {
    name: 'алфавиту (убыванию)',
    sortProperty: sortPropertyEnum.TITLE_ASC
  },
]

const Sort: React.FC<SortProps> = memo(({value}) => {
  const dispatch = useDispatch()
  const sortRef = useRef<HTMLDivElement>(null)
  const [list, setList] = useState(false)
  const handleClick = (sortType: SortItem) => {
    dispatch(setSortType(sortType))
    setList(false)
  }

  useEffect(() => {
    const handleClickOuside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current))  {
        setList(false)
      }
    }
    document.body.addEventListener('click', handleClickOuside)
    return () => {
      document.body.removeEventListener('click', handleClickOuside)
    }
  }, [])

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setList(!list)}>{value.name}</span>
      </div>
      {list &&
        <div className="sort__popup">
          <ul>
            {massSort.map((sortType, i) => <li key={i} onClick={() => handleClick(sortType)} className={value.sortProperty === sortType.sortProperty ? 'active' : ''}>{sortType.name}</li>)}
          </ul>
        </div>}
    </div>
  );
});

export default Sort;