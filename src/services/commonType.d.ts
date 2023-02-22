import { Models } from "appwrite"

export type ErrorRes = {
  message?: string
}

export type CourseType = {
  name: string
  desc: string
  img: string
  cost: string
  interested: integer
} & Models.Document

export type LessonType = {
  name: string
} & Models.Document

export type QuestionType = {

}