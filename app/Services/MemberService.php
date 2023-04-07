<?php

namespace App\Services;

use App\Models\Member;
use App\Repository\MemberRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use UnexpectedValueException;

class MemberService
{
    const PAGINATION_LIMIT = 25;

    private MemberRepository $memberRepository;

    /**
     * @param MemberRepository $memberRepository
     */
    public function __construct(MemberRepository $memberRepository)
    {
        $this->memberRepository = $memberRepository;
    }

    /**
     * @param string $email
     * @param string $password
     * @return array
     */
    public function login(string $email, string $password): array
    {
        $user = $this->memberRepository->findByEmail($email);
        if (is_null($user)) {
            throw new UnexpectedValueException('No account found for the information you entered.');
        }

        if (!Hash::check($password, $user->password)) {
            throw new UnexpectedValueException('Please check your password');
        }

        $model = (new Member())->fill((array)$user);
        $token = $model->createToken('memberAccessToken')->accessToken;

        return [
            'email' => $user->email,
            'name' => $user->name,
            'token' => $token
        ];
    }

    /**
     * @param Request $request
     * @return bool
     */
    public function register(Request $request): bool
    {
        $fullname = $request->get('firstName') . ' ' . $request->get('lastName');
        return $this->memberRepository->create($fullname, $request->get('email'), bcrypt($request->get('password')));
    }

    /**
     * @param int $memberId
     * @return object|null
     */
    public function getMemberById(int $memberId): ?object
    {
        return $this->memberRepository->findById($memberId);
    }

    /**
     * @param int $memberId
     * @param int $point
     * @return int
     */
    public function addPoint(int $memberId, int $point): int
    {
        return $this->memberRepository->addPoint($memberId, $point);
    }

    /**
     * @param int $page
     * @param int|null $state
     * @return array
     */
    public function readAll(int $page, int $state = null): array
    {
        $offset = ($page - 1) * self::PAGINATION_LIMIT;
        $data = $this->memberRepository->filter($offset, self::PAGINATION_LIMIT, $state)->toArray();

        return [
            'members' => $data['data'],
            'total' => $data['total'],
            'per_page' => $data['per_page']
        ];
    }

    /**
     * @param int $memberId
     * @param int $flagId
     * @return int
     */
    public function updateFlag(int $memberId, int $flagId): int
    {
        $flagId = $flagId === 0 ? null : $flagId;
        return $this->memberRepository->updateFlagByMemberId($memberId, $flagId);
    }
}
