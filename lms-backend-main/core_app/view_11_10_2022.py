from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from core_app.serializers import *
from core_app.models import *
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
# from django.http import JsonResponse
from django.contrib.auth import authenticate
import requests
# from generate_token import generate_token
import json
from datetime import datetime as dt
from django.conf import settings
# import jwt
import time
from django_zoom_meetings import ZoomMeetings
from .generate_token import *
from django.core import serializers
from LMS.utilization import upload_to_aws
from django.core.files.storage import FileSystemStorage
import os

# https://github.com/JoeyAlpha5/django-zoom-meetings

API_KEY = settings.API_KEY
API_SEC = settings.API_SEC
my_zoom = ZoomMeetings(API_KEY, API_SEC,"lmsaiml24@gmail.com")

User = get_user_model()

# Create your views here.


class signin(APIView):
    permission_classes = ()
    def post(self, request):
        received_json_data=request.data
        serializer = SignInSerializer(data=received_json_data)
        if serializer.is_valid():
            user = authenticate(
                request, 
                username=received_json_data['username'], 
                password=received_json_data['password'])
            if user is not None:
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'type': "teacher" if user.is_staff else "student"
                }, status=200)
            else:
                return Response({
                    'message': 'invalid username or password',
                }, status=403)
        else:
            return Response({'message':serializer.errors}, status=400)

class RegisterUser(APIView):
    serializer_class = RegisterSerializer
    def post(self, request):
        data_ = None
        if "userData" in request.data:
            data_ = request.data['userData']
        else:
            data_ = request.data

        serializer = self.serializer_class(data=data_)        
        if serializer.is_valid():        
            first_name = serializer.validated_data['first_name']
            last_name = serializer.validated_data["last_name"]
            is_staff = serializer.validated_data["is_staff"]
            email = serializer.validated_data["email"]
            phone_number = serializer.validated_data["phone_number"]
            qualification = serializer.validated_data["qualification"]
            password = serializer.validated_data["password"]
            skills = serializer.validated_data["skills"]
            interested_categories = serializer.validated_data["interested_categories"]

            if User.objects.filter(username=email).exists():
                return Response({"message":"username already exists"},
                status=400)
                
            user = User(
                first_name = first_name,
                last_name = last_name,
                is_staff = is_staff,
                email=email,
                username=email
            )
            user.set_password(password)
            user.save()
            if is_staff:
                teacher = Teacher(
                    user=user,
                    qualification=qualification,
                    phone_number=phone_number,
                    skills=skills
                )
                teacher.save()
            else:
                student = Student(
                    user=user,
                    interested_categories = interested_categories
                )
                student.save()

            return Response({"message":"success"},
            status=200)
        else:
            return Response({"message":serializer.errors},
            status=400)


class AddQuiz(APIView):
    permission_classes = [IsAuthenticated]  
    def post(self, request):
        user = request.user
        
        data = None
        if "quizData" in request.data:
            data = request.data['quizData']
        else:
            data = request.data
        if data:
            teacher = Teacher.objects.get(user=user)
            if teacher:
                title = data['title']
                detail = data['detail']
                course_id = data['course_id']

                if Quiz.objects.filter(teacher=teacher, title=title).exists():
                    return Response({'message':f'quiz already present'},status=200)    
                
                quiz = Quiz(teacher=teacher, title=title, detail=detail)
                quiz.save()
                course_quiz = CourseQuiz(course_id=course_id, quiz=quiz)
                course_quiz.save()
                return Response({'message':f'quiz saved for {teacher.user}'},status=200)
            else:
                return Response({'message':f'teacher not present'},status=400)
        else:
            return Response({'message':'empty payload !'},status=400)
    
    def get(self, request):
        data = Quiz.objects.filter(teacher__user_id=request.user.id)
        serializer = QuizSerializer(data, many=True)
        if serializer.data:
            return Response({"data":serializer.data},status=200)
        else:
            return Response({"message":serializer.errors},status=400)

class AddQuizQuestions(APIView):
    permission_classes = [IsAuthenticated] 
    def post(self, request):
        user = request.user
        data = None
        if "quizData" in request.data:
            data = request.data['quizData']
        else:
            data = request.data

        serializer = QuizQuestionSerializer(data = data)
        if serializer.is_valid():  
            try:  
                quiz_obj = Quiz.objects.get(id=serializer.validated_data['quiz_id'], teacher__user_id=user.id)
            except:
                return Response({"message":"quiz not found with this id"},status=200)    

            questions = serializer.validated_data['questions']
            ans1= serializer.validated_data['ans1']
            ans2= serializer.validated_data['ans2']
            ans3= serializer.validated_data['ans3']
            ans4= serializer.validated_data['ans4']
            right_ans= serializer.validated_data['right_ans']
            if QuizQuestions.objects.filter(questions=questions, quiz=quiz_obj).exists():
                return Response({'message':f'{questions} ? question already exists'},status=200)

            quiz_que = QuizQuestions(
                quiz=quiz_obj,
                questions=questions,
                ans1= ans1,
                ans2= ans2,
                ans3= ans3,
                ans4= ans4,
                right_ans= right_ans
            )
            quiz_que.save()
            return Response({'message':'quiz question added'},status=200)
        else:    
            return Response({'message':serializer.errors},status=400)
    
    def get(self, request):  
        users_quiz = Quiz.objects.filter(teacher__user_id=request.user.id)    
        quiz_question = []
        for quiz in users_quiz:
            data = QuizQuestions.objects.filter(quiz=quiz)
            serializer = QuizQuestionsSerializer_(data, many=True)
            quiz_question.append({quiz.title:serializer.data})
        
        return Response({'data':quiz_question},status=200)
        



            
class AddCourseCategory(APIView):
    serializer_class = CourseCategorySerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Course cateogery created"},status=200)
        else:
            return Response({"message":serializer.errors},status=200)
    
    def get(self, request):
        course_cat = CourseCategory.objects.all()
        serializer = self.serializer_class(course_cat, many=True)
        if serializer.data:
            return Response({"data":serializer.data},status=200)
        else:
            return Response({"message":"No cateogeries present"},status=204)

class AddCourse(APIView):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated] 
    def post(self, request):
        user_ = request.user
        data = None
        if "courseData" in request.data:
            data = request.data['courseData']
        else:
            data = request.data

        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            category_id = serializer.validated_data['category_id']
            title=serializer.validated_data['title']
            description=serializer.validated_data['description']
            
            if Course.objects.filter(category_id=category_id, teacher__user_id=user_.id, title=title).exists():
                return Response({"message":"Course already created with same title"},status=400)

            teacher_obj = Teacher.objects.get(user_id=user_.id)
            course_ = Course(category_id=category_id, 
            teacher=teacher_obj,
            title=title, description=description)
            course_.save()

            return Response({"message":"Course created"},status=200)
        else:
            return Response({"message":serializer.errors},status=400)
    
    def get(self, request):
        course_data = Course.objects.filter(teacher__user_id=request.user.id)
        serializer = CourseSerializerList(course_data, many=True)
        if serializer.data:
            return Response({"data":serializer.data},status=200)
        else:
            return Response({"message":"No content"},status=204)

class AddCourseQuiz(APIView):
    permission_classes = [IsAuthenticated] 
    serializer_class = CourseQuizSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"course quiz is created"},status=200)
        else:
            return Response({"message":serializer.errors},status=400)


class AddAssignment(APIView):
    permission_classes = [IsAuthenticated] 
    serializer_class = AssignmentSerializer
    def post(self, request):
        user = request.user
        data = None
        if "data" in request.data:
            data = request.data['data']
        else:
            data = request.data

        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            # file = serializer.validated_data['file']
            # print(file.name)
            
            if Assignment.objects.filter(teacher_id=user.id, 
            title=serializer.validated_data['title']).exists():
                return Response({"message":"Assignment already added for the current student"},
                status=200)


            teacher_obj = Teacher.objects.get(user_id=user.id)
            assignment = Assignment(
                teacher=teacher_obj,
                # file_upload_url="",
                title=serializer.validated_data['title'],
                question=serializer.validated_data['question']
                )
            assignment.save()

            return Response({"message":"assignment is created"},status=200)
        else:
            return Response({"message":serializer.errors},status=400)
    
    def get(self, request):
        data = Assignment.objects.filter(teacher__user_id=request.user.id)
        serializer = AssignmentListSerializer(data, many=True)
        if serializer.data:
            return Response({"data":serializer.data},status=200)
        else:
            return Response({"message":"data not found"},status=204)


class EnrollStudent(APIView):
    permission_classes = [IsAuthenticated] 
    serializer_class = EnrollStudentSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"student enorlled for the course"},status=200)
        else:
            return Response({"message":serializer.errors},status=400)

class StudentList(APIView):
    # permission_classes = [IsAuthenticated]     
    def get(self, request):
        student_list = Student.objects.filter(user__is_staff=False).values('user__id','user__username',
        'user__first_name',
        'user__last_name', 
        'interested_categories')
        student_list_ =  [ k for k in student_list]
        return Response({"data":student_list_},status=200)
        
class CreateMeeting(APIView):
    permission_classes = [IsAuthenticated] 
    serializer_class = CreateMeetingSerializer
    def post(self, request):
        seriailizer = self.serializer_class(data=request.data)
        if seriailizer.is_valid():
            topic = seriailizer.validated_data['topic']
            duration = seriailizer.validated_data['duration']
            password = seriailizer.validated_data['password']
            course_id = seriailizer.validated_data['course_id']
            
            create_meeting = my_zoom.CreateMeeting(dt.now(),
            topic,
            duration,
            password
            )


            try:
                teacher_obj = Teacher.objects.get(user_id=request.user.id)
                meeting_url = create_meeting['join_url']
                meeting = TeacherMeeting(
                    teacher=teacher_obj,
                    course_id=course_id,
                    start_url=create_meeting['start_url'],
                    meeting_link=meeting_url,
                    meeting_id=create_meeting['id'],                
                    password=password,
                    topic=topic
                )
                meeting.save()

                responses_dict = {
                    "start_url":create_meeting['start_url'],
                    "meeting_id":create_meeting['id']
                }
                return Response({"data":responses_dict}, status=200)
            except:
                return Response({"message":"zoom issue"}, status=400)

        return Response({'message':seriailizer.errors}, status=400)
    
    def get(self, request):
        data = TeacherMeeting.objects.filter(teacher__user_id=request.user.id).last()
        serializer = TeacherMeetingSerializer(data)
        if serializer.data:
            return Response({"data":serializer.data}, status=200)
        else:
            return Response({"message":"no content"}, status=204)

class StudentMeetingList(APIView):
    def get(self, request):
        data = TeacherMeeting.objects.all().last()
        serializer = StudentMeetingSerializer(data)
        if serializer.data:
            return Response({"data":serializer.data}, status=200)
        else:
            return Response({"message":"no content"}, status=204)

class UserProfile(APIView):
    permission_classes = [IsAuthenticated] 
    def get(self, request):
        try:
            user = User.objects.get(id=request.user.id)
            data = dict()
            data['username'] = user.username
            data['first_name'] = user.first_name
            data['last_name'] = user.last_name
            if user.is_staff:
                teacher = Teacher.objects.get(user_id=request.user.id)
                data['qualification'] = teacher.qualification
                data['phone_number'] = teacher.phone_number
                data['skills'] = teacher.skills
            else:
                student = Student.objects.get(user_id=request.user.id)
                data['interested_categories'] = student.interested_categories
        
            return Response({"data":data},status=200)
        except Exception as e:
            return Response({"message":"No user found with this credential"},status=400)

class StudentSubmitAssignment(APIView):
    permission_classes = [IsAuthenticated] 
    def post(self,request):
        data = request.data
        if data:
            teacher_id = data['teacher']
            assignment_id = data['assignment']
            assignment_answer = data['answer']
            print(type(teacher_id))
            teacher_obj = Teacher.objects.get(user_id=teacher_id)
            student_obj = Student.objects.get(user_id=request.user.id)

            assignmnet_sub = StudentAssignmentSubmission(
                student=student_obj,
                teacher=teacher_obj,                
                assignment_id=assignment_id,
                student_assignment_status=True,
                answer=assignment_answer
            )
            assignmnet_sub.save()

            return Response({"message":"assignment submited"},status=200)
        else:
            return Response({"message":"empty body !"},status=400)

class StudentViewAssignments(APIView):
    permission_classes = [IsAuthenticated] 
    def get(self, request):
        # course_enrolled = StudentCourseEnrollment.objects.get(student_id=request.user.id)
        # assignment = Assignment.objects.filter(teacher_id=course_enrolled.teacher, 
        # course=course_enrolled.course)
        student_assignment_data = []
        assignments = Assignment.objects.all()
        for assignment in assignments:     
            id = assignment.id
            teacher = assignment.teacher
            submission_status = False
            if StudentAssignmentSubmission.objects.filter(teacher=teacher, 
            assignment=assignment,student__user_id=request.user.id,
            student_assignment_status=True
            ).exists():
                submission_status=True

            student_assignment_data.append(
                {
                   "teacher":teacher.id,
                   "course":"",
                   "title":assignment.title,
                   "question":assignment.question,
                   "assignment_status":submission_status                
                }
            )

        # serializer = AssignmentListSerializer(assignment, many=True)            
        if student_assignment_data:
            return Response({"data":student_assignment_data},status=200)
        else:
            return Response({"message":"No data"},status=400)

class StudentQuizList(APIView):
    permission_classes = [IsAuthenticated] 
    def get(self, request):  
        users_quiz = Quiz.objects.all()    
        quiz_question = []
        for quiz in users_quiz:
            data = QuizQuestions.objects.filter(quiz=quiz)
            serializer = QuizQuestionsSerializer_(data, many=True)
            if serializer.data:
                quiz_question.append({quiz.title:serializer.data})
        
        return Response({'data':quiz_question},status=200)

class StudendAssignmentList(APIView):
    permission_classes = [IsAuthenticated] 
    def get(self, request):
        student_assignment_data = []
        assignments = Assignment.objects.all()
        for assignment in assignments:     
            id = assignment.id
            teacher = assignment.teacher
            submission_status = False
            if StudentAssignmentSubmission.objects.filter(teacher=teacher, 
            assignment=assignment,student__user_id=request.user.id,
            student_assignment_status=True
            ).exists():
                submission_status=True

            student_assignment_data.append(
                {
                   "teacher":teacher.user.id,
                   "course":"",
                   "title":assignment.title,
                   "id":assignment.id,
                   "question":assignment.question,
                   "assignment_status":submission_status                
                }
            )

        # serializer = AssignmentListSerializer(assignment, many=True)            
        if student_assignment_data:
            return Response({"data":student_assignment_data},status=200)
        else:
            return Response({"message":"No data"},status=400)

class get_recording_student(APIView):
    # permission_classes = [IsAuthenticated] 
    def get_meeting_id(self,request):
        # enrolled_teacher_info = StudentCourseEnrollment.objects.get(id=request.user.id)
        # teacher_meeting_info = TeacherMeeting.objects.filter(teacher=enrolled_teacher_info.teacher)        
        teacher_meeting_info = TeacherMeeting.objects.filter(teacher_id=2)    
        serializer = StudentMeetingSerializer(teacher_meeting_info, many=True)        
        meeting_id = [ meeting_id['meeting_id'] for meeting_id in serializer.data ]
        return meeting_id

    def get(self, request):
        token_ = request_token
        base_url = "https://api.zoom.us/v2"
        meeting_ids = self.get_meeting_id(request)  
        records_urls = []
        for meet_id in meeting_ids:      
            url = base_url + "/meetings/" + str(meet_id) + "/recordings"
            response = requests.get(url, headers={'Authorization': 'Bearer ' + token_})                        
            response = response.json()

            if 'code' in response:
                records_urls.append({"meet_id":meet_id,"record_url":""})    
            else:
                play_url = response['recording_files'][0]['play_url']
                records_urls.append({"meet_id":meet_id,"record_url":play_url})    

        return Response({"data":records_urls}, status=200)

# token_ = request_token
#         base_url = "https://api.zoom.us/v2"
#         meeting_id = self.get_meeting_id(request)
#         url = base_url + "/meetings/" + str(meeting_id) + "/recordings"
#         response = requests.get(url, headers={'Authorization': 'Bearer ' + token_})
#         if response.status == 200:
#             response = response.json()
#             recording_count = response['recording_count']
#             recording_files = response['recording_files']
            

    
#             return Response({"m":response},status=200)


# class AddAssignmentQuestions(APIView):
#     permission_classes = [IsAuthenticated] 
#     serializer_class = AssignmentQuestionsSerializer
#     def post(self, request):
#         serializer = self.serializer_class(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({"message":"assignment questions is created"},status=200)
#         else:
#             return Response({"message":serializer.errors},status=400)












