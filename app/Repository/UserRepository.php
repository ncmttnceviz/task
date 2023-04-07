<?php

namespace App\Repository;

use App\Models\User;
use Illuminate\Support\Collection;

class UserRepository extends AbstractRepository
{
    public function __construct()
    {
        parent::__construct(User::class);
    }

    /**
     * @param string $email
     * @return object|null
     */
    public function findByEmail(string $email): ?object
    {
        return $this->getQueryBuilder()
            ->where('email', '=', $email)
            ->first();
    }

    /**
     * @return Collection
     */
    public function findAll() : Collection
    {
        return $this->getQueryBuilder()
            ->select('id', 'name')
            ->get();
    }
}
