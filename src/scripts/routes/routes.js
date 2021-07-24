import GALLERY from '../views/pages/gallery';
import FAVORITE from '../views/pages/favorite';
import DETAIL from '../views/pages/detail';

const ROUTES = {
  '/': GALLERY, // default page
  '/detail/:id': DETAIL,
  '/favorite': FAVORITE,
};

export default ROUTES;
