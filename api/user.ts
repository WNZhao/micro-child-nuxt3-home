/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-04-07 16:12:32
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-04-07 16:13:40
 * @FilePath: /micro-child-nuxt3-home/api/user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useRequest } from '~/utils/request';

export interface User {
  id: number;
  name: string;
  email: string;
}

export const useUserApi = () => {
  const request = useRequest();

  const getUsers = async () => {
    return await request.get<User[]>('/users');
  };

  const getUserById = async (id: number) => {
    return await request.get<User>(`/users/${id}`);
  };

  const createUser = async (user: Omit<User, 'id'>) => {
    return await request.post<User>('/users', user);
  };

  const updateUser = async (id: number, user: Partial<User>) => {
    return await request.put<User>(`/users/${id}`, user);
  };

  const deleteUser = async (id: number) => {
    return await request.delete<null>(`/users/${id}`);
  };

  return {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  };
};
