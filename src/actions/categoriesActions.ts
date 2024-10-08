/* eslint-disable @typescript-eslint/no-explicit-any */
import { instant } from '../api/axios.api';

export const categoriesAction = async ({ request }: any) => {
  switch (request.method) {
    case 'POST': {
      const formData = await request.formData();
      const title = {
        title: formData.get('title'),
      };

      await instant.post('categories', title);

      return null;
    }

    case 'PATCH': {
      const formData = await request.formData();
      const category = {
        title: formData.get('title'),
        id: formData.get('id'),
      };

      await instant.patch(`categories/category/${category.id}`, category);

      return null;
    }

    case 'DELETE': {
      const formData = await request.formData();
      const categoryId = formData.get('id');
      await instant.delete(`categories/category/${categoryId}`);

      return null;
    }
    default:
      throw new Error(`Unsupported method: ${request.metod}`);
  }
};

export const categoriesLoader = async () => {
  const { data } = await instant.get('categories');

  return data;
};
