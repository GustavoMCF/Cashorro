import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import app from '../src/server.js'
import prisma from '../src/lib/prismaClient.js'

let createdAccountId

beforeAll(async () => {
  await prisma.$transaction([
    prisma.transaction.deleteMany(),
    prisma.account.deleteMany()
  ])
})

afterAll(async () => {
  await prisma.$disconnect()
})

describe('Accounts API', () => {
  it('should create a new account', async () => {
    const res = await request(app)
      .post('/accounts')
      .send({
        name: 'Nubank',
        type: 'BANK', // << VALOR CORRETO PARA O ENUM
        color: '#800080',
        initialBalance: 1200
      })

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body.name).toBe('Nubank')

    createdAccountId = res.body.id
  })

  it('should list all accounts', async () => {
    const res = await request(app).get('/accounts')

    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it('should update an account', async () => {
    const res = await request(app)
      .put(`/accounts/${createdAccountId}`)
      .send({
        name: 'Nubank Updated',
        type: 'BANK',
        color: '#0000FF',
        initialBalance: 1500
      })

    expect(res.status).toBe(200)
    expect(res.body.name).toBe('Nubank Updated')
  })

  it('should delete an account', async () => {
    const res = await request(app).delete(`/accounts/${createdAccountId}`)
    expect(res.status).toBe(204)
  })
})
