import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

//api here is an axios instance which has the baseURL set according to the env.
import urls from "constants/api";
import axios from "axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState();
  const [districts, setDistricts] = useState();
  const [locations, setLocations] = useState();
  const [ads, setAds] = useState();

  async function loadUserFromCookies() {
    const token = Cookies.get("token");
    try {
      const { data: category } = await axios.get(`${urls["test"]}/category`);
      setCategories(category.categories);
      const { data: district } = await axios.get(`${urls["test"]}/district`);
      setDistricts(district);
      const { data: location } = await axios.get(`${urls["test"]}/location`);
      setLocations(location);
    } catch (e) {
      console.log(e);
    }

    if (token && token != undefined) {
      const { data: data } = await axios.get(`${urls["test"]}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadUserFromCookies();
  }, []);

  const login = async (email, password) => {
    const token = Cookies.get("token");

    if (!token) {
      const { data: data } = await axios.post(`${urls["test"]}/auth/login`, {
        email,
        password,
      });

      if (data?.token) {
        Cookies.set("token", data.token);

        setUser(data.user);
        window.location.pathname = "/account";
      }
    }
  };
  const signup = async (email, password, username, phone) => {
    const token = Cookies.get("token");

    if (!token) {
      const { data: data } = await axios.post(`${urls["test"]}/auth/register`, {
        email,
        password,
        username,
        phone,
        isAdmin: false,
      });

      if (data?.token) {
        Cookies.set("token", data.token);

        setUser(data.user);
        window.location.pathname = "/account";
      }
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    window.location.pathname = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        loading,
        logout,
        categories,
        locations,
        districts,
        signup,
        ads,
        setAds,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
