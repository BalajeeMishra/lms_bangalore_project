from dataclasses import fields
from email.policy import default
from rest_framework import serializers
from django.contrib.auth import get_user_model
from core_app.models import *

User = get_user_model()


class RegisterSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=243)
    last_name = serializers.CharField(max_length=243)
    password = serializers.CharField(max_length=243)
    is_staff = serializers.BooleanField()
    email = serializers.EmailField()
    phone_number = serializers.CharField(max_length=243, default="")
    qualification = serializers.CharField(max_length=243, default="")
    skills = serializers.CharField(max_length=500, default="")
    interested_categories = serializers.CharField(max_length=500, default="")


class SignInSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=243)
    password = serializers.CharField(max_length=243)


class CourseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = '__all__'


class CourseSerializer(serializers.Serializer):
    category_id = serializers.IntegerField(required=True)
    title = serializers.CharField(max_length=243, required=True)
    description = serializers.CharField(max_length=600)


class CourseSerializerList(serializers.ModelSerializer):
    class Meta():
        model = Course
        fields = '__all__'


class ModuleSerializer(serializers.ModelSerializer):
    class Meta():
        model = Module
        fields = '__all__'


class QuizQuestionSerializer(serializers.Serializer):
    quiz_id = serializers.IntegerField(required=True)
    questions = serializers.CharField(max_length=243, required=True)
    ans1 = serializers.CharField(max_length=243, required=True)
    ans2 = serializers.CharField(max_length=243, required=True)
    ans3 = serializers.CharField(max_length=243, required=True)
    ans4 = serializers.CharField(max_length=243, required=True)
    right_ans = serializers.CharField(max_length=243, required=True)


class CourseQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseQuiz
        fields = ('course', 'quiz',)


class ModuleQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModuleQuiz
        fields = ('module', 'quiz',)

# class AssignmentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Assignment
#         fields = ('title','question')


class AssignmentSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=600, required=True)
    question = serializers.CharField(max_length=800)
    course = serializers.CharField(max_length=800)
    # file = serializers.FileField()


class AssignmentListSerializer(serializers.ModelSerializer):
    # course_name = serializers.CharField(max_length=800)
    class Meta:
        model = Assignment
        # fields = ('id','teacher','title','question','course_name')
        fields = '__all__'


class EnrollStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentCourseEnrollment
        fields = '__all__'


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'


class QuizQuestionsSerializer(serializers.ModelSerializer):
    class Meta():
        model = QuizQuestions
        fields = '__all__'
        # exclude = ('right_ans', )


class StudentQuizQuestionsSerializer(serializers.ModelSerializer):
    class Meta():
        model = QuizQuestions
        exclude = ('right_ans', )


class CreateMeetingSerializer(serializers.Serializer):
    topic = serializers.CharField(required=True)
    password = serializers.CharField(max_length=300, default="")
    duration = serializers.IntegerField()
    course_id = serializers.IntegerField()


class StudentMeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherMeeting
        fields = ('meeting_link', 'meeting_id', 'password', 'topic')


# class UserProfileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('')


class TeacherMeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherMeeting
        fields = ('meeting_link', 'start_url',
                  'meeting_id', 'password', 'topic')


class StudentQuizQuestionsSubmissionSer(serializers.Serializer):
    quiz = serializers.IntegerField()
    teacher = serializers.IntegerField()
    quiz_question = serializers.IntegerField()
    answer = serializers.CharField(max_length=1500)


class AssignmentMaterialSerializer(serializers.ModelSerializer):
    class Meta():
        model = AssignmentMaterial
        fields = '__all__'


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'


class StudentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('user__id', 'user__username', 'user__first_name',
                  'user__last_name', 'interested_categories')


class QuizSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer()

    class Meta:
        model = Quiz
        fields = '__all__'


class StudentQuizAnswerSerializer(serializers.ModelSerializer):
    class Meta():
        model = StudentQuizAnswer
        fields = '__all__'


class StudentQuizDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentQuizDetails
        fields = '__all__'


class StudentQuizDetailsListSerializer(serializers.ModelSerializer):
    student = StudentSerializer()
    quiz = QuizSerializer()
    teacher = TeacherSerializer()

    class Meta:
        model = StudentQuizDetails
        fields = ('id', 'student', 'quiz', 'score',
                  'teacher', 'submitted_answer')
        # fields = '__all__'


class GetUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class GetTeacherSerializer(serializers.ModelSerializer):
    user = GetUserSerializer()

    class Meta:
        model = Teacher
        fields = '__all__'


class StudentCourseSerializer(serializers.ModelSerializer):
    class Meta():
        model = StudentCourse
        fields = '__all__'
