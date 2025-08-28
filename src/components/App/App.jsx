import css from './App.module.css';
import { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import HomePage from '../../pages/HomePage/HomePage';
import MoviesPage from '../../pages/MoviesPage/MoviesPage'
import MovieDetailsPage from '../../pages/MovieDetailsPage/MovieDetailsPage'
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage'
import MovieCast from '../MovieCast/MovieCast'
import MovieReviews from '../MovieReviews/MovieReviews'
import Navigation from '../Navigation/Navigation'

const App = () => {
  return (
    <div className={css.container}>
      <Navigation />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
