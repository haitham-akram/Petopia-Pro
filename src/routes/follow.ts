import express from 'express'
import authenticate, { userTypes } from '../middlewares/auth'
const { ADMIN, REGULAR } = userTypes

