import { createContext, useContext, useEffect, useState } from 'react';

//api here is an axios instance which has the baseURL set according to the env.
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import urls from 'constants/api';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const toast = useToast();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState();
  const [ads, setAds] = useState(null);
  const [compareAds, setCompareAds] = useState([]);
  async function loadUserFromCookies() {
    const token = getCookie('token');
    const user = getCookie('user');
    const bookmarks = getCookie('bookmarks');
    setLoading(true);
    try {
      const { data: category } = await axios.get(`${urls['test']}/category`);
      setCategories(category.categories);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
    if (token && token != undefined) {
      try {
        const { data: data } = await axios.get(`${urls['test']}/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Headers': '*',
          },
        });

        setUser(data);
        setCookie('user', data);
        setCookie('bookmarts', data.bookmarks);
        // setCookie('bookmarks', data.user.bookmarks)
      } catch (error) {
        console.error(error);
        logout();
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    loadUserFromCookies();
  }, []);

  const login = async (email, password) => {
    const token = getCookie('token');
    email = email.toLowerCase();
    if (!token) {
      setLoading(true);
      try {
        const { data: data } = await axios.post(`${urls['test']}/auth/login`, {
          email: email,
          password,
        });

        if (!data?.status) {
          if (data.message == 'banned') {
            toast({
              title: 'Бандуулсан байна',
              status: 'warning',
              duration: 3000,
              isClosable: true,
            });
          }
          if (data.message == 'password not match') {
            toast({
              title: 'Нууц үг буруу байна',
              status: 'warning',
              duration: 3000,
              isClosable: true,
            });
          }
          if (data.message == 'not found user') {
            toast({
              title: 'И-майл хаяг буруу байна',
              status: 'warning',
              duration: 3000,
              isClosable: true,
            });
          }
        } else {
          if (data?.token && data.user.status == 'active') {
            setCookie('token', data.token);
            setCookie('bookmarks', data.user.bookmarks ?? []);
            setCookie('user', data.user);
            setUser(data.user);
            toast({
              title: 'Амжилттай нэвтэрлээ',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
            if (data.user.userType == 'admin' || data.user.userType == 'system')
              window.location.pathname = '/admin';
            else window.location.pathname = '/';
          } else {
            window.location.pathname = '/account/check';
          }
        }
      } catch (error) {
        setLoading(false);
        toast({
          // title: error.message,
          title: 'И-майл хаяг эсвэл нууц үг буруу байна',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
      setLoading(false);
    }
  };
  const signup = async (email, password, username, phone) => {
    const token = getCookie('token');
    email = email.toLowerCase();

    if (!token) {
      setLoading(true);
      try {
        const { data: data } = await axios.post(
          `${urls['test']}/auth/register`,
          {
            email,
            password,
            username,
            phone,
          }
        );

        if (!data) {
          window.location.pathname = '/account/check';
        }
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    }
    setLoading(false);
  };

  const logout = () => {
    deleteCookie('token');
    setUser(null);
    deleteCookie('user');
    deleteCookie('bookmarks');
    setLoading(false);
    window.location.pathname = '/login';
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        loading,
        logout,
        setLoading,
        categories,
        signup,
        ads,
        setAds,
        setCompareAds,
        compareAds,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
