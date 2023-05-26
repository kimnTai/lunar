import {ChecklistProps} from './checklists'

export interface SocketResultProps {
    attachment: any[]
    boardId : string
    checklist:  ChecklistProps[]
    closed: boolean
    comment: any[]
    createdAt: string
    date: any
    description: string
    id: string
    label: any[]
    listId: string
    member: any[]
    name: string
    position: string
    updatedAt: string
    _id: string
}