const { Items } = require('../models');
const { Op } = require('sequelize');

// 아이템 전체조회 리스트보기 하나보기
class ItemsRepository {
  findItems = async () => {
    const items = await Items.findAll({
      attributes: ['itemId', 'itemName', 'price'],
      order: [['itemId', 'ASC']],
    });

    return items;
  };

  // 카테고리로 상품 검색(무한 스크롤 적용)
  findItemsByCategory = async (query, page) => {
    const limit = 12;
    const offset = (page - 1) * limit;
    const itemList = await Items.findAll({
      where: { category: query },
      attributes: ['itemId', 'itemName', 'coverImage', 'price'],
      limit: limit,
      offset: offset,
    });

    return itemList;
  };

  // 사용자 쿼리로 상품 검색
  findItemsByQuery = async (query) => {
    const itemList = await Items.findAll({
      attributes: ['itemId', 'itemname', 'coverImage', 'price'],
      where: {
        itemname: {
          [Op.like]: `%${query}%`,
        },
      },
      limit: 6,
    });
    return itemList;
  };

  findItemByItemId = async (itemId) => {
    const itemList = await Items.findOne({ where: { itemId } });

    return itemList;
  };
}

module.exports = ItemsRepository;
