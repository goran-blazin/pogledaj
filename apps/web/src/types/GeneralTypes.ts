type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

export type Genre = {
  systemName: string;
  localizedName: string;
};

export type Language = {
  name: string;
  code: string;
};

export type Country = {
  name: string;
  code: string;
};

export type City = {
  name: string;
  code: string;
  postalCode: string;
};
