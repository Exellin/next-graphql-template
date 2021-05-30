import { GraphQLNonNull, GraphQLString } from "graphql";
import { hash, compare } from 'bcryptjs';
import { sign } from "jsonwebtoken";
import { FastifyRequest, FastifyReply } from 'fastify'

import User from '../models/User';
import { userGraphqlType, loginResponseGraphqlType } from '../schema';

interface LoginResponse {
  accessToken: string
}

interface Context {
  request: FastifyRequest,
  reply: FastifyReply
}

const register = {
  type: userGraphqlType,
  args: {
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_source: unknown, args: {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string }
  ): Promise<User> => {
    const { firstName, lastName, email, password } = args;
    let hashedPassword;

    if (password) {
      hashedPassword = await hash(password, 12);
    }

    const user = await User.query().insert({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    return user;
  }
};

const login = {
  type: loginResponseGraphqlType,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_source: unknown, args: {
    email?: string,
    password?: string },
    ctx: Context
  ): Promise<LoginResponse> => {
    const { email, password } = args;
    const user = await User.query().findOne({ email });

    if (!user || !password) {
      throw new Error ('invalid credentials')
    }

    const valid = await compare(password, user.password)

    if (!valid) {
      throw new Error ('invalid credentials')
    }

    ctx.reply.setCookie('jid', sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET!, {expiresIn: '7d'}), { httpOnly: true })

    return {
      accessToken: sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {expiresIn: '15m'})
    };
  }
};

export { register, login }
