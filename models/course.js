function createModelCourse(Sequelize, DataTypes) {
  const Course = Sequelize.define(
    "Course",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      judul: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isi: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING, 
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "courses",
    }
  );
  return Course;
}

module.exports = createModelCourse;
