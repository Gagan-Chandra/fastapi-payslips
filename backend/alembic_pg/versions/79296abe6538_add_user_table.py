"""Add user table

Revision ID: 79296abe6538
Revises: d9dbc0a9bdf8
Create Date: 2024-01-19 21:47:37.205521

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '79296abe6538'
down_revision: Union[str, None] = 'd9dbc0a9bdf8'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('users',
                        sa.Column('user_id',sa.Integer(),nullable=False),
                        sa.Column('email',sa.String(),nullable=False),
                        sa.Column('password',sa.String(),nullable=False),
                        sa.Column('created_at',sa.TIMESTAMP(timezone=True),
                                    server_default=sa.text('now()'),nullable=False),
                        sa.PrimaryKeyConstraint('user_id'),
                        sa.UniqueConstraint('email'))
    pass


def downgrade() -> None:
    op.drop_table('users')
    pass
