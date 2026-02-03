import { useState, useEffect, useCallback } from 'react';
import {
  DAY_PLACEHOLDER,
  MONTH_PLACEHOLDER,
  YEAR_PLACEHOLDER,
} from '../constants/dateOptions';
import type { Todo } from '../types';

export interface TodoFormState {
  title: string;
  day: string;
  month: string;
  year: string;
  description: string;
  completed: boolean;
}

const initialFormState: TodoFormState = {
  title: '',
  day: DAY_PLACEHOLDER,
  month: MONTH_PLACEHOLDER,
  year: YEAR_PLACEHOLDER,
  description: '',
  completed: false,
};

export function useTodoForm(initialTodo: Todo | null) {
  const [title, setTitle] = useState(initialFormState.title);
  const [day, setDay] = useState(initialFormState.day);
  const [month, setMonth] = useState(initialFormState.month);
  const [year, setYear] = useState(initialFormState.year);
  const [description, setDescription] = useState(initialFormState.description);
  const [completed, setCompleted] = useState(initialFormState.completed);

  const reset = useCallback(() => {
    setTitle(initialFormState.title);
    setDay(initialFormState.day);
    setMonth(initialFormState.month);
    setYear(initialFormState.year);
    setDescription(initialFormState.description);
    setCompleted(initialFormState.completed);
  }, []);

  useEffect(() => {
    if (initialTodo) {
      setTitle(initialTodo.title);
      setDay(initialTodo.day);
      setMonth(initialTodo.month);
      setYear(initialTodo.year);
      setDescription(
        initialTodo.description && initialTodo.description !== ' '
          ? initialTodo.description
          : ''
      );
      setCompleted(initialTodo.completed);
    } else {
      reset();
    }
  }, [initialTodo, reset]);

  return {
    title,
    setTitle,
    day,
    setDay,
    month,
    setMonth,
    year,
    setYear,
    description,
    setDescription,
    completed,
    setCompleted,
    reset,
  };
}
