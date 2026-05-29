import { renderHook, act } from "@testing-library/react";
import { useCreateUser } from "../use-create-user";
import { passwordValidationErrors } from "../../constants/validation";

describe('useCreateUser', () => {
    it('should return an object with correct properties', () => {
        const { result } = renderHook(useCreateUser);

        expect(result.current).toHaveProperty('successMessage');
        expect(result.current).toHaveProperty('errorMessage');
        expect(result.current).toHaveProperty('onSubmit');
        expect(result.current).toHaveProperty('onSuccess');
        expect(result.current).toHaveProperty('onError');

        expect(typeof result.current.successMessage).toBe('string');
        expect(typeof result.current.errorMessage).toBe('string');
        expect(typeof result.current.onSubmit).toBe('function');
        expect(typeof result.current.onSuccess).toBe('function');
        expect(typeof result.current.onError).toBe('function');
    });

    it('should set the success message', () => {
        const { result } = renderHook(useCreateUser);

        expect(result.current.successMessage).toBe('');

        // когда мы хотим изменить state, мы вызываем act,
        // передаём в него callback и внутри него выполняем какие-то действия
        act(() => {
            result.current.onSuccess({name: 'John', password: 'Qw2e3r4!#@'});
        });

        expect(result.current.successMessage).toBe('User John created with password Qw2e3r4!#@');
    });

    it('should set the error message', () => {
        const { result } = renderHook(useCreateUser);

        expect(result.current.errorMessage).toBe('');

        // когда мы хотим изменить state, мы вызываем act,
        // передаём в него callback и внутри него выполняем какие-то действия
        act(() => {
            result.current.onError(new Error('Invalid password'));
        });

        expect(result.current.errorMessage).toBe('Invalid password');
    });

    it('should throw an error', async () => {
        const { result } = renderHook(useCreateUser);

        await expect(result.current.onSubmit({password: '123'})).rejects.toThrow(
            passwordValidationErrors.length,
        );
    });

    it('should not throw an error', async () => {
        const { result } = renderHook(useCreateUser);

        await expect(result.current.onSubmit({password: 'Qw2e3r4!#@'})).resolves.toBe();
    });
});