const { Task } = require('../models');

// @desc    Kullanıcının görevlerini filtreleme ve sayfalama ile getirme
// @route   GET /api/tasks?status=yapılıyor&page=1&limit=5
const getTasks = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    // Filtreleme koşulu
    const whereCondition = { userId: req.user.id };
    if (status) {
      whereCondition.status = status;
    }

    // Sayfalama (Pagination) hesabı
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    const offset = (parsedPage - 1) * parsedLimit;

    // Sequelize findAndCountAll ile toplam sayı ve veriyi çekme
    const { count, rows: tasks } = await Task.findAndCountAll({
      where: whereCondition,
      limit: parsedLimit,
      offset: offset,
      order: [['createdAt', 'DESC']], // En yeni görevler üstte
    });

    res.json({
      totalTasks: count,
      totalPages: Math.ceil(count / parsedLimit),
      currentPage: parsedPage,
      tasks,
    });
  } catch (error) {
    next(error); // Hatayı Global Error Handler'a yönlendirir
  }
};
