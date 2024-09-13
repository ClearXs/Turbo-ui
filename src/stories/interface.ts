import { Entity, Tree } from '@/api';
import { Meta } from '@storybook/react';

export type Sample = Entity;
export type SampleTree = Tree;

export type Property<T> = Meta<T>['argTypes'];
