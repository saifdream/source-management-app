import { Subject } from 'rxjs';

const subject = new Subject();

export const productCountService = {
  sendCount: count => subject.next({ count: count }),
  clearCount: () => subject.next(),
  getCount: () => subject.asObservable()
};