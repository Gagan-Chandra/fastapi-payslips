"""Add payments table

Revision ID: ae9d6c41cdf4
Revises: 
Create Date: 2024-01-19 22:11:03.845842

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ae9d6c41cdf4'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('payments',
                        sa.Column('payment_id',sa.Integer(),nullable=False),
                        sa.Column('first_name',sa.VARCHAR(50), nullable = False),
                        sa.Column('last_name',sa.VARCHAR(50),nullable = False),
                        sa.Column('email',sa.VARCHAR(50),nullable=False),
                        sa.Column('salary',sa.Float,nullable=False),
                        sa.Column('salary_credit_date',sa.TIMESTAMP(timezone=True),
                                    server_default=sa.text('now()'),nullable=False),
                        sa.Column('bonus',sa.Float,nullable=False),
                        sa.Column('tax',sa.Float,nullable=False),
                        sa.Column('health_insurance',sa.Float,nullable=False),
                        sa.Column('net_pay',sa.Float,nullable=False),
                        sa.PrimaryKeyConstraint('payment_id'),
                        sa.UniqueConstraint('email'))
    pass


def downgrade() -> None:
    op.drop_table('payments')
    pass
