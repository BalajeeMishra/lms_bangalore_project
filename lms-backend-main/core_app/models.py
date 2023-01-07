from email.policy import default
from django.db import models
# from django.contrib.auth.models import AbstractUser, get_user_model
from django.contrib.auth import get_user_model
from django.utils.timezone import now

# course 70

User = get_user_model()


class Teacher(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    qualification = models.CharField(max_length=250, null=True, blank=True)
    phone_number = models.CharField(max_length=32, null=True, blank=True)
    skills = models.TextField()

# Course Category Model


class CourseCategory(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()
    # class Meta:
    #     verbose_name_plural="2. Course Categories"


class Course(models.Model):
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE)
    teacher = models.ForeignKey(
        Teacher, blank=True, null=True, on_delete=models.CASCADE)
    title = models.CharField(max_length=150)
    description = models.TextField()
    is_deleted = models.BooleanField(default=False)


class Module(models.Model):
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="course_module")
    title = models.CharField(max_length=150)
    description = models.TextField()
    is_deleted = models.BooleanField(default=False)
    teacher = models.ForeignKey(
        Teacher, blank=True, null=True, on_delete=models.CASCADE)


class CourseMaterial(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    material_url = models.TextField()
    add_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.course.title

# Quiz Model


class Quiz (models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    detail = models.TextField()
    add_time = models.DateTimeField(auto_now_add=True)
    is_deleted = models.BooleanField(default=False)

# Quiz Questions Model


class QuizQuestions (models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    questions = models.CharField(max_length=200)
    ans1 = models.CharField(max_length=200)
    ans2 = models.CharField(max_length=200)
    ans3 = models.CharField(max_length=200)
    ans4 = models.CharField(max_length=200)
    right_ans = models.CharField(max_length=200)
    add_time = models.DateTimeField(auto_now_add=True)
    is_deleted = models.BooleanField(default=False)


class CourseQuiz(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, null=True)
    add_time = models.DateTimeField(auto_now_add=True)


class ModuleQuiz(models.Model):
    module = models.ForeignKey(
        Module, on_delete=models.CASCADE, related_name="module_quiz")
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, null=True)
    add_time = models.DateTimeField(auto_now_add=True)


class Student(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    interested_categories = models.TextField()


class StudentCourseEnrollment(models.Model):
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name='enrolled_courses')
    student = models.ForeignKey(
        Student, on_delete=models.CASCADE, related_name='enrolled_student')
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    enrolled_time = models.DateTimeField(auto_now_add=True)


class Assignment(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    # student = models.ForeignKey(Student,on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=200)
    question = models.TextField()
    # file_upload_url = models.CharField (max_length=800)
    right_ans = models.CharField(max_length=200)
    add_time = models.DateTimeField(auto_now_add=True)
    is_deleted = models.BooleanField(default=False)


class AssignmentMaterial(models.Model):
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    material_url = models.TextField()
    add_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.assignment.title

# class AssignmentQuestions(models.Model):


class CourseAssignment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True)
    assignment = models.ForeignKey(
        Assignment, on_delete=models.CASCADE, null=True)
    add_time = models.DateTimeField(auto_now_add=True)


class TeacherMeeting(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    meeting_link = models.CharField(max_length=800)
    start_url = models.CharField(max_length=800)
    meeting_id = models.CharField(max_length=800)
    password = models.CharField(max_length=300, default="")
    topic = models.CharField(max_length=300, default="")


class StudentAssignmentSubmission(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE)
    student_assignment_status = models.BooleanField(default=False)
    material_url = models.TextField(default="")
    answer = models.TextField()
    submitted_time = models.DateTimeField(auto_now=True)
    grade = models.CharField(max_length=10)

    def __str__(self):
        return self.assignment.title


class ZoomMeetinRecording(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    meeting_id = models.IntegerField()
    passcode = models.CharField(max_length=300)
    play_urls = models.CharField(max_length=300)
    recording_count = models.IntegerField()
    download_url = models.CharField(max_length=500)
    reacording_start = models.DateTimeField()
    reacording_end = models.DateTimeField()


class StudentQuizQuestionsSubmission(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    quiz_question = models.ForeignKey(QuizQuestions, on_delete=models.CASCADE)
    answer = models.CharField(max_length=200)
    submission_status = models.BooleanField(default=False)
    add_time = models.DateTimeField(auto_now_add=True)
    result = models.BooleanField(default=False)


class StudentQuizDetails(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)


class StudentQuizAnswer(models.Model):
    question = models.ForeignKey(QuizQuestions, on_delete=models.CASCADE)
    answer = models.CharField(max_length=200)
    result = models.BooleanField(default=False)
    submitted_quiz = models.ForeignKey(
        StudentQuizDetails, on_delete=models.CASCADE, related_name='quiz_answer_submitted_answer',)


class StudentCourse(models.Model):
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name='enrolled_student_courses')
    student = models.ForeignKey(
        Student, on_delete=models.CASCADE, related_name='enrolled_student_id')
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    enrolled_time = models.DateTimeField(auto_now_add=True)
