const Course = require('../models/Course.js');

async function getAllByDate(search) {
    const query = {};   // Създаваме празен обект, ако трябва да ни върне всички курсове;
    if (search){        // Ако има въведено нещо в полето за search
        query.title = new RegExp(search, 'i');  // Казваме да търсим по title и да намери, нещо което има в себе си search написаното и да е case-insensitive с флага 'i'
    }
    return Course.find(query).sort({ createdAt: 1 }).lean();
    // Търсим всички курсове по въведеното в search полето. Ако няма въведено нищо ще ни върне всички 
    // Сортираме всички резултати по дата на създаване като взимаме във възходящ ред
}

async function getRecent() {
	return Course.find({}).sort({ userCount: -1 }).limit(3).lean();
	// Сортираме курса по брой записани в намалящ ред и взимаме само 3 резултата
}

async function createCourse(course) {
	return Course.create(course);           // Връщаме курса, който сме създали
}

async function getById(id) {
	return Course.findById(id).lean();      // Намираме курса по id
}

async function deleteById(id) {
	return Course.findByIdAndDelete(id);
}

async function updateById(id, course) {
	const existing = await Course.findById(id); // Намираме курса, който искаме да едитнем

	existing.title = course.title;              // Казваме изрично, кои полета искаме да едитнем
	existing.description = course.description;
	existing.imageUrl = course.imageUrl;
	existing.duration = course.duration;

	return existing.save();                     // Връщаме вече едитнатия курс с новите му стойности
}

async function enrollUser(courseId, userId) {
	const existing = await Course.findById(courseId);   // Намираме курса, който искаме да едитнем

	existing.users.push(userId);                        // Към масива с потребители записани за курса, добавяме подадения потребител
	existing.userCount++;                               // Увеличаваме броя на записаните за курса с единица

	return existing.save();                             // Връщаме вече едитнатия курс с новите му стойности
}

module.exports = {
	getAllByDate,
	getRecent,
	createCourse,
	getById,
	deleteById,
	updateById,
	enrollUser,
};
