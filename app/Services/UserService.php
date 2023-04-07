<?php

namespace App\Services;

use App\Models\User;
use App\Repository\UserRepository;
use Illuminate\Support\Facades\Hash;
use UnexpectedValueException;

class UserService
{
    private UserRepository $userRepository;

    /**
     * @param UserRepository $userRepository
     */
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @param string $email
     * @param string $password
     * @return array
     */
    public function login(string $email, string $password): array
    {
        $user = $this->userRepository->findByEmail($email);

        if (is_null($user)) {
            throw new UnexpectedValueException('No account found for the information you entered.', 'USFLG');
        }

        if (!Hash::check($password, $user->password)) {
            throw new UnexpectedValueException('Please check your password', 'USFLG1');
        }

        $model = (new User())->fill((array)$user);

        $token = $model->createToken('accessToken')->accessToken;

        return [
            'email' => $user->email,
            'name' => $user->name,
            'token' => $token
        ];
    }

    /**
     * @return array
     */
    public function readAll(): array
    {
        return $this->userRepository->findAll()->toArray();
    }

}
