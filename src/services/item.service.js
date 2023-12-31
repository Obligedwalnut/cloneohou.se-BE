const ItemsRepository = require('../repositories/item.repository');
const CustomError = require('../middlewares/errorMiddleware.js');
const { Op } = require('sequelize');

class ItemsService {
  itemsRepository = new ItemsRepository();

  // item 전체 조회
  findItems = async () => {
    const items = await this.itemsRepository.findItems();
    if (items.length === 0) {
      throw new CustomError('등록된 상품이 없습니다', 404);
    }
    return items;
  };

  //* query or category 를 이용한 item 검색(무한 스크롤 적용)
  findItemsByCategoryOrQuery = async (query) => {
    // 쿼리를 받지 않은 경우
    if (Object.keys(query).length === 0) {
      throw new CustomError('검색어를 입력해야 합니다', 400);
    }

    // 페이지 값을 받지 않은 경우
    if (!query.page) {
      throw new CustomError('페이지 값이 없습니다', 400);
    }
    // 페이지 값이 1 미만인 경우
    if (query.page < 1) {
      throw new CustomError('page는 1 이상 입력해주세요', 404);
    }
    // 카테고리만 입력 된 경우
    if (query.category || !query.query) {
      // 카테고리 데이터 타입을 숫자로 변환
      query.category = Number(query.category);

      // 카테고리에 해당하는 상품들 받아오기
      const categorySearchedData =
        await this.itemsRepository.findItemsByCategory(
          query.category,
          query.page
        );
      if (categorySearchedData.length === 0) {
        throw new CustomError('카테고리에 해당하는 상품이 없습니다', 404);
      }
      return categorySearchedData;

      // 쿼리만 입력 된 경우
    } else if (!query.category || query.query) {
      // 쿼리에 해당하는 상품 받아오기
      const querySearchedData = await this.itemsRepository.findItemsByQuery(
        query.query,
        query.page
      );
      if (querySearchedData.length === 0) {
        throw new CustomError('쿼리에 해당하는 상품이 없습니다', 404);
      }
      return querySearchedData;
      // 쿼리, 카테고리 둘 다 입력받지 못한 경우
    } else if (!query.query && !query.category) {
      throw new CustomError('검색이 필요합니다', 400);
    }
  };

  // item 하나보기
  findItemByItemId = async (itemId) => {
    const findItemByItemIdData = await this.itemsRepository.findItemByItemId(
      itemId
    );

    if (!findItemByItemIdData) {
      throw new CustomError('해당 상품이 존재하지 않습니다', 404);
    }
    return findItemByItemIdData;
  };
}

module.exports = ItemsService;
