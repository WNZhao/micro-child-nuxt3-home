export interface ApiRequestData {
  [key: string]: unknown;
}

export const useRequest = () => {
  const config = useRuntimeConfig();

  // 根据环境和配置决定使用哪个基础URL
  const getBaseUrl = () => {
    // 生产环境使用生产API地址
    if (process.env.NODE_ENV === 'production') {
      return config.public.prodApiBase;
    }
    // 开发环境根据配置决定使用本地mock还是云端mock
    return config.public.useCloudMock
      ? config.public.cloudMockUrl
      : config.public.apiBase;
  };

  const baseURL = getBaseUrl();

  const get = async <T>(url: string, options?: Record<string, unknown>) => {
    return await $fetch<T>(`${baseURL}${url}`, {
      method: 'GET',
      ...options,
    });
  };

  const post = async <T>(
    url: string,
    data?: ApiRequestData,
    options?: Record<string, unknown>
  ) => {
    return await $fetch<T>(`${baseURL}${url}`, {
      method: 'POST',
      body: data,
      ...options,
    });
  };

  const put = async <T>(
    url: string,
    data?: ApiRequestData,
    options?: Record<string, unknown>
  ) => {
    return await $fetch<T>(`${baseURL}${url}`, {
      method: 'PUT',
      body: data,
      ...options,
    });
  };

  const del = async <T>(url: string, options?: Record<string, unknown>) => {
    return await $fetch<T>(`${baseURL}${url}`, {
      method: 'DELETE',
      ...options,
    });
  };

  return {
    get,
    post,
    put,
    delete: del,
  };
};
