import css from './styles.module.css';
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [state, setState] = useState({ search: '' });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({
      search: '',
    });
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={handleSubmit} className={css.search_form}>
        <button type="submit" className={css.search_button}>
          <span className={css.search_button_label}>Search</span>
        </button>

        <input
          value={state.search}
          onChange={handleChange}
          className={css.search_input}
          type="text"
          name="search"
          autoComplete="off"
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  );
};
