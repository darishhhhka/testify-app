import { TestAttemp } from "./testAttempModel"
import { Test } from "./testModel"
import { User } from "./userModel"

export interface State{
    user: User
    test: Record<number, Omit<Test, "id">>
    testAttemp: Record<number, Omit<TestAttemp, "id">>
}