import { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import RecipeDtail from "./pages/RecipeDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";
import MealPlanner from "./pages/MealPlanner";
import SearchResults from "./pages/SearchResults";
import { AuthProvider } from "./context/AuthContext";
import { PlannerProvider } from "./context/MealPlanContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PlannerProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/recipe/:id" element={<RecipeDtail />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/planner" element={<MealPlanner />} />
              </Route>
              <Route path="/search" element={<SearchResults />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </PlannerProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
