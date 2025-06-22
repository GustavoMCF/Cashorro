import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import app from '../src/server.js'
import prisma from '../src/lib/prismaClient.js'

let createdCategoryId

beforeAll(async () => {
  await prisma.transaction.deleteMany()
  await prisma.category.deleteMany()
})

afterAll(async () => {
  await prisma.$disconnect()
})

describe('Categories API', () => {
  it('should create a new category', async () => {
    const res = await request(app)
      .post('/categories')
      .send({
        name: 'Transporte',
        type: 'EXPENSE', 
        icon: 'car' 
      })

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body.name).toBe('Transporte')

    createdCategoryId = res.body.id
  })

  it('should list all categories', async () => {
    const res = await request(app).get('/categories')

    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it('should update a category', async () => {
    const res = await request(app)
      .put(`/categories/${createdCategoryId}`)
      .send({
        name: 'Transporte Atualizado',
        type: 'EXPENSE',
        icon: 'bus'
      })

    expect(res.status).toBe(200)
    expect(res.body.name).toBe('Transporte Atualizado')
  })

  it('should delete a category', async () => {
    const res = await request(app).delete(`/categories/${createdCategoryId}`)
    expect(res.status).toBe(204)
  })
})